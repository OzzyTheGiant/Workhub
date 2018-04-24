package dreamcraft.workhub.web;

import dreamcraft.workhub.model.Client;
import dreamcraft.workhub.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class ClientController {
    @Autowired ClientService clientService;

    @GetMapping(path = "clients")
    public List<Client> clientList() {
        return clientService.selectAll();
    }
}
