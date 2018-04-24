package dreamcraft.workhub.dao;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import dreamcraft.workhub.Application;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {Application.class})
@TestExecutionListeners({
        DependencyInjectionTestExecutionListener.class,
        DbUnitTestExecutionListener.class
})
class ClientDAOTest {
    @Autowired private ClientDAO clientDAO;

    @Test
    public void findAll_ShouldReturnTwoClients() throws Exception {
        assertThat(clientDAO.findAll(), hasSize(2));
    }

    @Test
    public void findById_shouldReturnOneClient() throws Exception {
        assertEquals("100000", clientDAO.findById("100000").get().getId(), "findById() must return one client with the id queried");
    }
}