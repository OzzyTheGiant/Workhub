package dreamcraft.workhub.service;

import dreamcraft.workhub.dao.DocumentActionDAO;
import dreamcraft.workhub.model.DocumentAction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
class DocumentActionServiceTest {
    @InjectMocks DocumentActionService actionService;
    @Mock DocumentActionDAO actionDAO;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void selectByDocumentId_ShouldReturnListOfDocumentActions() {
        List<DocumentAction> actions = Arrays.asList(new DocumentAction());
        when(actionDAO.findByDocumentId("AAAAAAAAAAA")).thenReturn(actions);
        assertEquals(actions, actionDAO.findByDocumentId("AAAAAAAAAAA"));
        verify(actionDAO).findByDocumentId("AAAAAAAAAAA");
    }
}