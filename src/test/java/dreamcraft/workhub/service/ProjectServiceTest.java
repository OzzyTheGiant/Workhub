package dreamcraft.workhub.service;

import dreamcraft.workhub.dao.ProjectDAO;
import dreamcraft.workhub.model.Project;
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
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class ProjectServiceTest {
    @InjectMocks ProjectServiceInterface projectService = new ProjectService();
    @Mock ProjectDAO projectDAO;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void selectAllByClientId_ShouldReturnListOfProjectsByClientId() {
        when(projectDAO.findAllByClientId("100000")).thenReturn(Arrays.asList(new Project(), new Project()));
        assertEquals(2, projectService.selectAllByClientId("100000").size(), "selectAllByClientId should return 2 projects");
        verify(projectDAO).findAllByClientId("100000");
    }

    @Test
    public void selectAllByClientId_ShouldReturnEmptyListIfNoneFound() {
        when(projectDAO.findAllByClientId("100000")).thenReturn(Arrays.asList());
        assertEquals(0, projectService.selectAllByClientId("100000").size(), "selectAllByClientId should return an empty list");
        verify(projectDAO).findAllByClientId("100000");
    }

    @Test
    public void selectById_ShouldReturnOneProject() {
        when(projectDAO.findById(1)).thenReturn(Optional.of(new Project()));
        assertThat(projectService.selectById(1), instanceOf(Project.class));
        verify(projectDAO).findById(1);
    }

    @Test
    public void selectById_ShouldThrowExceptionIfNoneFound() {
        assertThrows(NoResultsFoundException.class, () -> projectService.selectById(0));
        verify(projectDAO).findById(0);
    }
}