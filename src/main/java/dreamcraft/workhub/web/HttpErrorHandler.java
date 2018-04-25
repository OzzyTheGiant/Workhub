package dreamcraft.workhub.web;

import dreamcraft.workhub.service.NoResultsFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class HttpErrorHandler {
    @ExceptionHandler
    public ResponseEntity<String> Error404NotFound(NoResultsFoundException e) {
        return ResponseEntity.notFound().build();
    }
}
