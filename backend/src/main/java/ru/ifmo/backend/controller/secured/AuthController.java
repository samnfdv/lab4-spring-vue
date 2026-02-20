package ru.ifmo.backend.controller.secured;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.backend.model.entity.dto.PointAddRequest;
import ru.ifmo.backend.model.entity.dto.PointDto;
import ru.ifmo.backend.model.entity.dto.ResultDto;
import ru.ifmo.backend.model.service.ResultService;
import ru.ifmo.backend.model.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final ResultService resultService;
    private final UserService userService;




    @Autowired
    public AuthController(ResultService resultService, UserService userService) {
        this.userService = userService;
        this.resultService = resultService;
    }

    @GetMapping("/allResults")
    public ResponseEntity<List<ResultDto>> getAllResults(Principal principal) {
        String username = principal.getName();
        return ResponseEntity.ok(resultService.getAllResults(username));
    }

    @PostMapping("/addPoint")
    public ResponseEntity<List<ResultDto>> addResult(
            @RequestBody PointAddRequest pointAddRequest
            ,Principal principal) {
        PointDto pointDto = new PointDto(pointAddRequest.getX(), pointAddRequest.getY(), pointAddRequest.getR(), userService.getCurrentUser());
        resultService.add(pointDto);
        String username = principal.getName();
        return ResponseEntity.ok(resultService.getAllResults(username));
    }
}
