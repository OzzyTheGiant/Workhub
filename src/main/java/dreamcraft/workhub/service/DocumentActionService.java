package dreamcraft.workhub.service;

import dreamcraft.workhub.dao.DocumentActionDAO;
import dreamcraft.workhub.model.DocumentAction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentActionService implements DocumentActionServiceInterface{
    @Autowired DocumentActionDAO documentActionDAO;

    @Override
    public List<DocumentAction> selectAll() {
        return documentActionDAO.findAll();
    }

    @Override
    public DocumentAction selectById(int id) {
        return documentActionDAO.findById(id).get();
    }

    @Override
    public void save(DocumentAction action) {
        documentActionDAO.save(action);
    }

    @Override
    public void delete(DocumentAction action) {
        documentActionDAO.delete(action);
    }
}
