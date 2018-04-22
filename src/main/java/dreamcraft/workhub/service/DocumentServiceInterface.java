package dreamcraft.workhub.service;

import dreamcraft.workhub.model.Document;
import java.util.List;

public interface DocumentServiceInterface {
    List<Document> selectAll();
    Document selectById(String id);
    void save(Document document);
    void delete(Document document);
}