package dreamcraft.workhub.dao;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import dreamcraft.workhub.Application;
import dreamcraft.workhub.model.Document;
import dreamcraft.workhub.model.DocumentAction;
import dreamcraft.workhub.model.DocumentActionType;
import dreamcraft.workhub.model.Employee;
import dreamcraft.workhub.service.NoResultsFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;

import java.util.Date;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.instanceOf;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {Application.class})
@TestExecutionListeners({
        DependencyInjectionTestExecutionListener.class,
        DbUnitTestExecutionListener.class
})
public class DocumentActionDAOTest {
    @Autowired DocumentActionDAO actionDAO;
    @Autowired DocumentDAO documentDAO;

    @Test
    public void save_ShouldInsertNewDocumentAction() {
        DocumentAction action = createTestDocumentAction();
        Date date = new Date();
        action.setActionDate(date);
        actionDAO.save(action);
        assertThat(
            actionDAO.findById(action.getId()).orElseThrow(NoResultsFoundException::new),
            instanceOf(DocumentAction.class)
        );
    }

    private DocumentAction createTestDocumentAction() {
        DocumentAction action = new DocumentAction();
        action.setActionType(DocumentActionType.OPEN);
        Document doc = new Document();
        doc.setId("AAAAAAAAAAA");
        action.setDocument(doc);
        Employee employee = new Employee();
        employee.setId((short) 1);
        action.setEmployee(employee);
        return action;
    }
}
