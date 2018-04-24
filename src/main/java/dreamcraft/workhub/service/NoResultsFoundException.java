package dreamcraft.workhub.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NoResultsFoundException extends RuntimeException {
    public NoResultsFoundException() {
        super("The database did not find any records matching your query");
    }
}