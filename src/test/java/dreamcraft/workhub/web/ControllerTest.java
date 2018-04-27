package dreamcraft.workhub.web;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.nio.charset.Charset;

public abstract class ControllerTest {
    protected MockMvc mockMVC;
    public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(
            MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8")
    );

    public static final MediaType TEXT_PLAIN_UTF8 = new MediaType(
            MediaType.TEXT_PLAIN.getType(),
            MediaType.TEXT_PLAIN.getSubtype(),
            Charset.forName("utf8")
    );

    @BeforeEach
    public void setup() throws Exception {
        MockitoAnnotations.initMocks(this);
        initMockMvcAndSampleData();
    }

    abstract void initMockMvcAndSampleData();
}
