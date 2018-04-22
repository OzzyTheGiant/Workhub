package dreamcraft.workhub.dao;

import dreamcraft.workhub.model.Document;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentDAO extends CrudRepository<Document, String> {
    @Override
    List<Document> findAll();
}
