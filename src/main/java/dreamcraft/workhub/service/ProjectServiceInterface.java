package dreamcraft.workhub.service;

import dreamcraft.workhub.model.Project;
import java.util.List;

public interface ProjectServiceInterface {
    List<Project> selectAll();
    List<Project> selectAllByClientId(String id);
    Project selectById(int id);
    void save(Project project);
    void delete(Project project);
}