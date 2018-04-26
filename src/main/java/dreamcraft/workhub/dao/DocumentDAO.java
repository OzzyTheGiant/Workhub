package dreamcraft.workhub.dao;

import dreamcraft.workhub.model.Document;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentDAO extends CrudRepository<Document, String> {
    @Override
    List<Document> findAll();

    @Query("select d from Document d where d.client.id=:#{#clientId}")
    List<Document> findAllByClientId(@Param("clientId") String clientId);

    @Query("select d from Document d where d.project.id=:#{#{projectId}")
    List<Document> findAllByProjectId(@Param("projectId") int projectId);
}
