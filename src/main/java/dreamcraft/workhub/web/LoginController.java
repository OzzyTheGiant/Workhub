package dreamcraft.workhub.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String home() {
        return "test";
    }
}
