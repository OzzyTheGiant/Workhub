package dreamcraft.workhub.dao;

import dreamcraft.workhub.model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeDAO extends CrudRepository<Employee, Integer> {
    @Override
    List<Employee> findAll();
}
