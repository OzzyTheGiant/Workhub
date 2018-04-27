package dreamcraft.workhub.dao;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import dreamcraft.workhub.Application;
import dreamcraft.workhub.model.Document;
import dreamcraft.workhub.service.NoResultsFoundException;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.instanceOf;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {Application.class})
@TestExecutionListeners({
        DependencyInjectionTestExecutionListener.class,
        DbUnitTestExecutionListener.class
})
class DocumentDAOTest {
    @Autowired DocumentDAO documentDAO;

    @Test
    public void findAllByClientId_ShouldReturnTwoDocuments() {
        assertEquals(2, documentDAO.findAllByClientId("100000").size());
    }

    @Test
    public void findAllByProjectId_ShouldReturnTwoDocuments() {
        assertEquals(2, documentDAO.findAllByProjectId(1).size());
    }

    @Test
    public void findById_ShouldReturnOneDocument() {
        assertThat(
                documentDAO.findById("AAAAAAAAAAA").orElseThrow(NoResultsFoundException::new),
                instanceOf(Document.class)
        );
    }
}