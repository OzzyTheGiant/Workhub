package dreamcraft.workhub.web;

import dreamcraft.workhub.model.Document;
import dreamcraft.workhub.model.Employee;
import dreamcraft.workhub.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
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

    @GetMapping(value = "/documents/{id}/open", produces={"text/plain"})
    public String openDocument(@PathVariable String id, Principal principal, HttpServletResponse response) {
        Employee employee = (Employee)((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        response.setHeader("Content-Type", "text/plain;charset=utf8");
        return documentService.getDocumentFilePath(id, employee);
    }
}
