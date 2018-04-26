package dreamcraft.workhub.service;

import dreamcraft.workhub.dao.DocumentDAO;
import dreamcraft.workhub.model.Document;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
class DocumentServiceTest {
    @InjectMocks private DocumentService documentService;
    @Mock private DocumentDAO documentDAO;

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
    public void selectByClientId_ShouldReturnEmptyListIfNoneFound() {
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
    public void selectByProjectId_ShouldReturnEmptyListIfNoneFound() {
        when(documentDAO.findAllByProjectId(1)).thenReturn(Arrays.asList());
        assertEquals(0, documentService.selectByProjectId(1).size(), "selectByProjectId() should return and empty list");
        verify(documentDAO).findAllByProjectId(1);
    }
}