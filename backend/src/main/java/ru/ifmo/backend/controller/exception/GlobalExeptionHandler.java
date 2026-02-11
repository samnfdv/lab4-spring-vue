package ru.ifmo.backend.controller.exception;

import org.springframework.boot.webmvc.error.ErrorController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
@CrossOrigin(origins = "http://localhost:5173")
public class GlobalExeptionHandler  implements ErrorController {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> illegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<String> handleThrowable(Throwable throwable) {
        return ResponseEntity.badRequest().body(throwable.getMessage());
    }

}
