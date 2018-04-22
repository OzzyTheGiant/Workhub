package dreamcraft.workhub.dao;

import dreamcraft.workhub.model.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectDAO extends CrudRepository<Project, Integer> {
    @Override
    List<Project> findAll();
}