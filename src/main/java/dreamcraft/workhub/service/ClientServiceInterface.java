package dreamcraft.workhub.service;

import dreamcraft.workhub.model.Client;
import java.util.List;

public interface ClientServiceInterface {
    List<Client> selectAll();
    Client selectById(String id) throws NoResultsFoundException;
    void save(Client client);
    void delete(Client client);
}
