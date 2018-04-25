package dreamcraft.workhub.web;

import dreamcraft.workhub.model.Client;
import dreamcraft.workhub.service.ClientService;
import dreamcraft.workhub.service.NoResultsFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(MockitoJUnitRunner.class)
class ClientControllerTest {
    private MockMvc mockMVC;
    private Client client;
    @InjectMocks private ClientController controller;
    @Mock private ClientService clientService;
    private static final MediaType APPLICATION_JSON_UTF8 = new MediaType(
            MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8")
    );

    @BeforeEach
    public void setup() throws Exception {
        MockitoAnnotations.initMocks(this);
        mockMVC = MockMvcBuilders.standaloneSetup(controller).build();
        client = new Client();
        client.setId("100000");
        client.setClientName("Ozzy Perez");
    }

    @Test
    public void clientList_ShouldReturnListOfClientsAsJSON() throws Exception {
        String expectedResult = "[{\"id\":\"100000\",\"clientName\":\"Ozzy Perez\"},{\"id\":\"100000A\",\"clientName\":\"ABC Company, Inc.\"}]";
        List<Client> clients = new ArrayList<>();
        Client client2 = new Client();
        client2.setId("100000A");
        client2.setClientName("ABC Company, Inc.");
        clients.add(client);
        clients.add(client2);
        when(clientService.selectAll()).thenReturn(clients);
        MvcResult result = mockMVC.perform(get("/clients"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andReturn();
        verify(clientService).selectAll();
        JSONAssert.assertEquals(expectedResult, result.getResponse().getContentAsString(), false);
    }

    @Test
    public void getClientById_ShouldReturnOneClientById() throws Exception {
        String expectedResult = "{\"id\":\"100000\",\"clientName\":\"Ozzy Perez\"}";
        when(clientService.selectById("100000")).thenReturn(client);
        MvcResult result = mockMVC.perform(get("/clients/100000"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andReturn();
        verify(clientService).selectById("100000");
        JSONAssert.assertEquals(expectedResult, result.getResponse().getContentAsString(), false);
    }

    @Test
    public void getClientById_ShouldThrowError404IfNotFound() throws Exception {
        when(clientService.selectById("DoesNotExist")).thenThrow(NoResultsFoundException.class);
        mockMVC.perform(get("/clients/DoesNotExist"))
                .andExpect(status().isNotFound());
        verify(clientService).selectById("DoesNotExist");
    }
}