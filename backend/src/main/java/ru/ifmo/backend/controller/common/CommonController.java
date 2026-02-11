package ru.ifmo.backend.controller.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.backend.entity.dto.PointDto;
import ru.ifmo.backend.entity.dto.ResultDto;
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

    @GetMapping("/allResults")
    public ResponseEntity<List<ResultDto>> getAllResults(){
        return ResponseEntity.ok(resultService.getAllResults());
    }

    @GetMapping("/add")
    public ResponseEntity<List<ResultDto>> addResult(@RequestParam int x, @RequestParam int y, @RequestParam int r) {
        PointDto pointDto = new PointDto(x, y, r);
        resultService.add(pointDto);
        return ResponseEntity.ok(resultService.getAllResults());
    }
}
