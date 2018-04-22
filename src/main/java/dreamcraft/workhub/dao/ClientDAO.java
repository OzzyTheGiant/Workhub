package dreamcraft.workhub.dao;

import dreamcraft.workhub.model.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClientDAO extends CrudRepository<Client, String> {
    @Override
    List<Client> findAll();
}
