package dreamcraft.workhub.dao;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import dreamcraft.workhub.Application;
import dreamcraft.workhub.model.Project;
import dreamcraft.workhub.service.NoResultsFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.instanceOf;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {Application.class})
@TestExecutionListeners({
        DependencyInjectionTestExecutionListener.class,
        DbUnitTestExecutionListener.class
})
class ProjectDAOTest {
	@Autowired private ProjectDAO projectDAO;
	
	@Test
	public void findAll_ShouldReturnThreeProjects() throws Exception {
		assertThat(projectDAO.findAll(), hasSize(3));
	}

    @Test
    public void findAll_ShouldReturnTwoClients() throws Exception {
        assertThat(projectDAO.findAllByClientId("100000"), hasSize(2));
    }

    @Test
    public void findById_shouldReturnOneClient() throws Exception {
        Project project = projectDAO.findById(1).orElseThrow(NoResultsFoundException::new);
        assertThat(project, instanceOf(Project.class));
        assertEquals(1, project.getId(), "findById() must return one client with the id queried");
    }
}