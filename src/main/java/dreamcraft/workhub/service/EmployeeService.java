package dreamcraft.workhub.service;

import dreamcraft.workhub.dao.EmployeeDAO;
import dreamcraft.workhub.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service("EmployeeService")
public class EmployeeService implements EmployeeServiceInterface {
    @Autowired EmployeeDAO employeeDAO;

    @Override
    public List<Employee> selectAll() {
        return employeeDAO.findAll();
    }

    @Override
    public Employee selectById(int id) {
        return employeeDAO.findById(id).get();
    }

    @Override
    public void save(Employee employee) {
        employeeDAO.save(employee);
    }

    @Override
    public void delete(Employee employee) {
        employeeDAO.delete(employee);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeDAO.findByUsername(username);
        if (employee == null) throw new NoResultsFoundException();
        return employee;
    }
}
