package dreamcraft.workhub.dao;

import dreamcraft.workhub.model.DocumentAction;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentActionDAO extends CrudRepository<DocumentAction, Integer> {
    @Override
    List<DocumentAction> findAll();

    @Query("select a from DocumentAction a where a.document.id=:#{#docId}")
    List<DocumentAction> findByDocumentId(@Param("docId") String docId);
}
