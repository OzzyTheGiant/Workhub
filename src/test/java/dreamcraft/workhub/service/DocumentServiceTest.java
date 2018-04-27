package dreamcraft.workhub.service;

import dreamcraft.workhub.dao.DocumentDAO;
import dreamcraft.workhub.filesystem.DescriptiveFolderStructure;
import dreamcraft.workhub.model.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import java.util.Arrays;
import java.util.Optional;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.instanceOf;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class DocumentServiceTest {
    @InjectMocks private DocumentService documentService;
    @Mock private DocumentDAO documentDAO;
    @Mock private DescriptiveFolderStructure structure;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void selectByClientId_ShouldReturnListOfDocumentsByClient() throws Exception {
        when(documentDAO.findAllByClientId("100000")).thenReturn(Arrays.asList(new Document(), new Document()));
        assertEquals(2, documentService.selectByClientId("100000").size(), "selectByClientId() should return a list of two documents");
        verify(documentDAO).findAllByClientId("100000");
    }

    @Test
    public void selectByClientId_ShouldReturnEmptyListIfNoneFound() throws Exception {
        when(documentDAO.findAllByClientId("100000")).thenReturn(Arrays.asList());
        assertEquals(0, documentService.selectByClientId("100000").size(), "selectByClientId() should return and empty list");
        verify(documentDAO).findAllByClientId("100000");
    }

    @Test
    public void selectByProjectId_ShouldReturnListOfDocumentsByProject() throws Exception {
        when(documentDAO.findAllByProjectId(1)).thenReturn(Arrays.asList(new Document(), new Document()));
        assertEquals(2, documentService.selectByProjectId(1).size(), "selectByProjectId() should return a list of two documents");
        verify(documentDAO).findAllByProjectId(1);
    }

    @Test
    public void selectByProjectId_ShouldReturnEmptyListIfNoneFound() throws Exception {
        when(documentDAO.findAllByProjectId(1)).thenReturn(Arrays.asList());
        assertEquals(0, documentService.selectByProjectId(1).size(), "selectByProjectId() should return and empty list");
        verify(documentDAO).findAllByProjectId(1);
    }

    @Test
    public void findById_ShouldReturnOneDocument() throws Exception {
        when(documentDAO.findById("AAAAAAAAAAA")).thenReturn(Optional.of(new Document()));
        assertThat(documentService.selectById("AAAAAAAAAAA"), instanceOf(Document.class));
        verify(documentDAO).findById("AAAAAAAAAAA");
    }

    @Test
    public void findById_ShouldThrowExceptionIfNoneFound() {
        assertThrows(NoResultsFoundException.class, () -> documentService.selectById("doesnotexist"));
        verify(documentDAO).findById("doesnotexist");
    }

    @Test
    public void getDocumentFilePath_ShouldReturnStringPath() {
        Document document = createNewTestDocument();
        when(documentDAO.findById("AAAAAAAAAAA")).thenReturn(Optional.of(document));
        assertThat(documentService.getDocumentFilePath("AAAAAAAAAAA"), instanceOf(String.class));
        verify(documentDAO).findById("AAAAAAAAAAA");
    }

    @Test
    public void getDocumentFilePath_ShouldThrowExceptionIfNoDocumentFound() {
        assertThrows(NoResultsFoundException.class, () -> documentService.getDocumentFilePath("doesnotexist"));
        verify(documentDAO).findById("doesnotexist");
    }

    private Document createNewTestDocument() {
        Document document = new Document();
        document.setClient(new Client());
        Project project = new Project();
        project.setCategory(new ProjectCategory());
        document.setProject(project);
        document.setCategory(new DocumentCategory());
        return document;
    }
}