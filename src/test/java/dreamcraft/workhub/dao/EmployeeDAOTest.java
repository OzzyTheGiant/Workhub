package dreamcraft.workhub.dao;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import dreamcraft.workhub.Application;
import dreamcraft.workhub.model.Employee;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.instanceOf;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {Application.class})
@TestExecutionListeners({
    DependencyInjectionTestExecutionListener.class,
    DbUnitTestExecutionListener.class
})
public class EmployeeDAOTest {
    @Autowired EmployeeDAO employeeDAO;

    @Test
    public void findByUsername_ShouldReturnOneEmployee() {
        assertThat(employeeDAO.findByUsername("OzzyTheGiant"), instanceOf(Employee.class));
    }
}
