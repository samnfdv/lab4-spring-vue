package ru.ifmo.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.backend.entity.Result;
import ru.ifmo.backend.service.ResultService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CommonController {
    private final ResultService resultService;

    @Autowired
    public CommonController(ResultService resultService) {
        this.resultService = resultService;
    }

    @GetMapping
    public ResponseEntity<List<Result>> getAllResults(){
        return ResponseEntity.ok(resultService.getAllResults());
    }
}
