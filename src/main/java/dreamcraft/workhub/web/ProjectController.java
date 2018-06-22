package dreamcraft.workhub.web;

import dreamcraft.workhub.model.Project;
import dreamcraft.workhub.service.ProjectServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProjectController {
	@Autowired ProjectServiceInterface projectService;
	
	@GetMapping("projects")
	public List<Project> getAllProjects() {
		return projectService.selectAll();
	}

    @GetMapping("/clients/{clientId}/projects")
    public List<Project> projectListForClient(@PathVariable String clientId) {
        return projectService.selectAllByClientId(clientId);
    }

    @GetMapping("/projects/{projectId}")
    public Project getProjectById(@PathVariable int projectId) {
        return projectService.selectById(projectId);
    }
}
