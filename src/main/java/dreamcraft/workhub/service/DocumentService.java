package dreamcraft.workhub.service;

import dreamcraft.workhub.config.WorkhubProperties;
import dreamcraft.workhub.dao.DocumentDAO;
import dreamcraft.workhub.filesystem.DescriptiveFolderStructure;
import dreamcraft.workhub.filesystem.FolderStructure;
import dreamcraft.workhub.model.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService implements DocumentServiceInterface {
    @Autowired DocumentDAO documentDAO;
    @Autowired WorkhubProperties properties;

    @Override
    public List<Document> selectAll() {
        return documentDAO.findAll();
    }

    @Override
    public Document selectById(String id) {
        return documentDAO.findById(id).orElseThrow(NoResultsFoundException::new);
    }

    @Override
    public void save(Document document) {
        documentDAO.save(document);
    }

    @Override
    public void delete(Document document) {
        documentDAO.delete(document);
    }

    @Override
    public List<Document> selectByClientId(String clientId) {
        return documentDAO.findAllByClientId(clientId);
    }

    @Override
    public List<Document> selectByProjectId(int projectId) {
        return documentDAO.findAllByProjectId(projectId);
    }

    public String getDocumentFilePath(String id) throws NoResultsFoundException {
        Document document = selectById(id);
        FolderStructure structure = new DescriptiveFolderStructure(properties.getRootPath());
        return structure.generateFilePath(document);
    }
}
