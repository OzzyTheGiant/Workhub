package dreamcraft.workhub.service;

import dreamcraft.workhub.dao.ClientDAO;
import dreamcraft.workhub.model.Client;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.hamcrest.Matchers.instanceOf;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class ClientServiceTest {
    @InjectMocks private ClientServiceInterface clientService = new ClientService();
    @Mock private ClientDAO clientDAO;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void findAll_ShouldReturnTwoRecords() throws Exception {
        List<Client> clients = Arrays.asList(new Client(), new Client());
        when(clientDAO.findAll()).thenReturn(clients);
        assertEquals(2, clientService.selectAll().size(), "clientDAO.findAll() should return 2 clients");
        verify(clientDAO).findAll();
    }

    @Test
    public void findById_shouldReturnOneRecord() throws Exception {
        Client client = new Client();
        when(clientDAO.findById("100000")).thenReturn(Optional.of(client));
        assertThat(clientService.selectById("100000"), instanceOf(Client.class));
        verify(clientDAO).findById("100000");
    }

    @Test
    public void findAll_shouldReturnZeroIfNoneFound() throws Exception {
        when(clientDAO.findAll()).thenReturn(new ArrayList<Client>());
        assertEquals(0, clientService.selectAll().size(), "No records should be found if table is empty");
        verify(clientDAO).findAll();
    }

    @Test
    public void findById_shouldThrowExceptionIfNoneFound() throws Exception {
        assertThrows(NoResultsFoundException.class, () -> clientService.selectById("100000"));
        verify(clientDAO).findById("100000");
    }
}