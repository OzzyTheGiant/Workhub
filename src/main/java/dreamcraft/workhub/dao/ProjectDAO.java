package dreamcraft.workhub.dao;

import dreamcraft.workhub.model.Project;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectDAO extends CrudRepository<Project, Integer> {
    @Override
    List<Project> findAll();

    @Query("select p from Project p where p.client.id=:#{#clientId}")
    List<Project> findAllByClientId(@Param("clientId") String clientId);
}