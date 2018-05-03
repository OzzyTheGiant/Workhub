package dreamcraft.workhub.service;

import dreamcraft.workhub.model.Employee;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface EmployeeServiceInterface extends UserDetailsService {
    List<Employee> selectAll();
    Employee selectById(int id);
    void save(Employee employee);
    void delete(Employee employee);
}
