package dreamcraft.workhub.web;

import dreamcraft.workhub.model.Document;
import dreamcraft.workhub.service.DocumentService;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.Arrays;
import java.util.List;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(MockitoJUnitRunner.class)
class DocumentControllerTest extends ControllerTest {
    private Document document;
    @InjectMocks private DocumentController controller;
    @Mock private DocumentService documentService;

    @Override
    void initMockMvcAndSampleData() {
        mockMVC = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    public void getDocumentsByClientId_ShouldReturnListOfTwoDocuments() throws Exception {
        document = new Document();
        List<Document> documents = Arrays.asList(document, document);
        when(documentService.selectByClientId("100000")).thenReturn(documents);
        MvcResult result = mockMVC.perform(get("/clients/100000/documents"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8))
            .andReturn();
        verify(documentService).selectByClientId("100000");
        JSONAssert.assertEquals(createJSONArray().toString(), result.getResponse().getContentAsString(), false);
    }

    @Test
    public void getDocumentsByClientId_ShouldReturnEmptyArrayIfNotFound() throws Exception {
        when(documentService.selectByClientId("100000")).thenReturn(Arrays.asList());
        MvcResult result = mockMVC.perform(get("/clients/100000/documents"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8))
            .andReturn();
        verify(documentService).selectByClientId("100000");
        JSONAssert.assertEquals("[]", result.getResponse().getContentAsString(), false);
    }

    private JSONObject createJSONObject() throws JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", null);
        jsonObject.put("description", null);
        jsonObject.put("filePath", null);
        jsonObject.put("client", null);
        jsonObject.put("project", null);
        jsonObject.put("fileType", null);
        return jsonObject;
    }

    private JSONArray createJSONArray() throws JSONException {
        JSONObject object = createJSONObject();
        JSONArray array = new JSONArray();
        array.put(object);
        array.put(object);
        return array;
    }

    @Test
    public void getDocumentsByProjectId_ShouldReturnListOfTwoDocuments() throws Exception {
        document = new Document();
        List<Document> documents = Arrays.asList(document, document);
        when(documentService.selectByProjectId(1)).thenReturn(documents);
        MvcResult result = mockMVC.perform(get("/projects/1/documents"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andReturn();
        verify(documentService).selectByProjectId(1);
        JSONAssert.assertEquals(createJSONArray().toString(), result.getResponse().getContentAsString(), false);
    }

    @Test
    public void getDocumentsByProjectId_ShouldReturnEmptyArrayIfNotFound() throws Exception {
        when(documentService.selectByProjectId(1)).thenReturn(Arrays.asList());
        MvcResult result = mockMVC.perform(get("/projects/1/documents"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andReturn();
        verify(documentService).selectByProjectId(1);
        JSONAssert.assertEquals("[]", result.getResponse().getContentAsString(), false);
    }

    @Test
    public void openDocument_ShouldReturnStringPath() throws Exception {
        when(documentService.getDocumentFilePath("AAAAAAAAAAA")).thenReturn("/path/to/filedirectory");
        MvcResult result = mockMVC.perform(get("/documents/AAAAAAAAAAA/open"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(TEXT_PLAIN_UTF8))
                .andReturn();
        verify(documentService).getDocumentFilePath("AAAAAAAAAAA");
    }
}