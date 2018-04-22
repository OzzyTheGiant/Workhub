package dreamcraft.workhub.service;

import dreamcraft.workhub.dao.ProjectDAO;
import dreamcraft.workhub.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService implements ProjectServiceInterface {
    @Autowired ProjectDAO projectDAO;

    @Override
    public List<Project> selectAll() {
        return projectDAO.findAll();
    }

    @Override
    public Project selectById(int id) {
        return projectDAO.findById(id).get();
    }

    @Override
    public void save(Project project) {
        projectDAO.save(project);
    }

    @Override
    public void delete(Project project) {
        projectDAO.delete(project);
    }
}
