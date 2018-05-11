package dreamcraft.workhub.web;

import dreamcraft.workhub.model.Project;
import dreamcraft.workhub.service.ProjectService;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.skyscreamer.jsonassert.JSONAssert;
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
class ProjectControllerTest extends ControllerTest {
    private Project project;
    @InjectMocks private ProjectController controller;
    @Mock private ProjectService projectService;

    @Override
    void initMockMvcAndSampleData() {
        mockMVC = MockMvcBuilders.standaloneSetup(controller).build();
        project = new Project();
    }

    @Test
    public void projectListForClient_shouldReturnListOfProjectsByClient() throws Exception {
        List<Project> projects = Arrays.asList(project, project);
        when(projectService.selectAllByClientId("100000")).thenReturn(projects);
        MvcResult result = mockMVC.perform(get("/clients/100000/projects"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andReturn();
        verify(projectService).selectAllByClientId("100000");
        JSONArray jsonArray = createJSONArray();
        System.out.println(jsonArray.toString());
        System.out.println(result.getResponse().getContentAsString());
        JSONAssert.assertEquals(jsonArray.toString(), result.getResponse().getContentAsString(), false);
    }

    @Test
    public void projectListForClient_ShouldReturnEmptyArrayIfNoneFound() throws Exception {
        when(projectService.selectAllByClientId("DoesNotExist")).thenReturn(Arrays.asList());
        MvcResult result = mockMVC.perform(get("/clients/DoesNotExist/projects"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8))
            .andReturn();
        verify(projectService).selectAllByClientId("DoesNotExist");
        JSONAssert.assertEquals("[]", result.getResponse().getContentAsString(), false);
    }

    private JSONArray createJSONArray() throws JSONException {
        /* expected values */
        JSONObject record = createJSONObject();
        JSONArray array = new JSONArray();
        array.put(record);
        array.put(record);
        return array;
    }

    private JSONObject createJSONObject() throws JSONException {
        /* expected values */
        JSONObject record = new JSONObject();
        record.put("id", null);
        record.put("name", null);
        record.put("client", null);
        return record;
    }

    @Test
    public void getProjectById_ShouldReturnOneProject() throws Exception {
        when(projectService.selectById(1)).thenReturn(project);
        MvcResult result = mockMVC.perform(get("/projects/1"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8))
            .andReturn();
        verify(projectService).selectById(1);
        JSONAssert.assertEquals(createJSONObject().toString(), result.getResponse().getContentAsString(), false);
    }
}