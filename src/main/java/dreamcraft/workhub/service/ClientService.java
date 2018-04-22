package dreamcraft.workhub.service;

import dreamcraft.workhub.dao.ClientDAO;
import dreamcraft.workhub.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClientService implements ClientServiceInterface {
    @Autowired ClientDAO clientDAO;

    @Override
    public List<Client> selectAll() {
        return clientDAO.findAll();
    }

    @Override
    public Client selectById(String id) {
        return clientDAO.findById(id).get();
    }

    @Override
    public void save(Client client) {
        clientDAO.save(client);
    }

    @Override
    public void delete(Client client) {
        clientDAO.delete(client);
    }
}
