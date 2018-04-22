package dreamcraft.workhub.service;

import dreamcraft.workhub.model.DocumentAction;
import java.util.List;

public interface DocumentActionServiceInterface {
    List<DocumentAction> selectAll();
    DocumentAction selectById(int id);
    void save(DocumentAction action);
    void delete(DocumentAction action);
}