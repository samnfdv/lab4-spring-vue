package ru.ifmo.backend.model.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.ifmo.backend.model.entity.Result;
import ru.ifmo.backend.model.entity.dto.PointDto;
import ru.ifmo.backend.model.entity.dto.ResultDto;
import ru.ifmo.backend.model.repository.ResultRepository;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional
public class ResultService {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm");

    private final ResultRepository resultRepository;

    @Autowired
    public ResultService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    @Transactional
    public List<ResultDto> getAllResults(String username) {
        return  resultRepository.findAllByUserName( username)
                .stream()
                .map(r -> new ResultDto(r.getX(),r.getY(),r.getR(),r.getSuccess(),r.getTime())).toList();
    }

    @Transactional
    public void add(PointDto point) {
        String time = formatter.format(ZonedDateTime.now(ZoneId.of("Europe/Moscow")));
        double x = point.getX();
        double y = point.getY();
        int r = point.getR();
        if ((x > r*1.5 || x < -r*1.5) || (y > r*1.5 || y < -r*1.5)) throw new IllegalArgumentException("Недоступные координаты");
        Result result = Result.builder()
                .x(point.getX())
                .y(point.getY())
                .r(point.getR())
                .time(time)
                .success(checkHit(point.getX(), point.getY(), point.getR()))
                .user(point.getUser())
                .build();
        resultRepository.save(result);
    }

    private Boolean checkHit(double x, double y,  int r) {
        if (x <= 0 && x >= -r && y >= 0 && y <= r / 2.0) return true;

        if (x <= 0 && y <= 0 && (x + y >= -r)) return true;

        return x >= 0 && y <= 0 && (x * x + y * y <= r * r);
    }
}
