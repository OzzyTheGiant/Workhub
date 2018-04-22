package dreamcraft.workhub.service;

import dreamcraft.workhub.dao.EmployeeDAO;
import dreamcraft.workhub.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
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
}
