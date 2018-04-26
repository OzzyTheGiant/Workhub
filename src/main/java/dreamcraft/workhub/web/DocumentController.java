package dreamcraft.workhub.web;

import dreamcraft.workhub.model.Document;
import dreamcraft.workhub.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class DocumentController {
    @Autowired private DocumentService documentService;

    @GetMapping("/clients/{clientId}/documents")
    public List<Document> getDocumentsByClientId(@PathVariable String clientId) {
        return documentService.selectByClientId(clientId);
    }

    @GetMapping("/projects/{projectId}/documents")
    public List<Document> getDocumentsByProjectId(@PathVariable int projectId) {
        return documentService.selectByProjectId(projectId);
    }

    @GetMapping("/documents/{id}")
    public ResponseEntity<String> openDocument() {
        return ResponseEntity.ok().build();
    }
}
