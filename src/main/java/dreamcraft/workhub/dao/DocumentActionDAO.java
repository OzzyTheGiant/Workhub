package dreamcraft.workhub.dao;

import dreamcraft.workhub.model.DocumentAction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentActionDAO extends CrudRepository<DocumentAction, Integer> {
    @Override
    List<DocumentAction> findAll();
}
