package ru.ifmo.backend.service;


import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.ifmo.backend.entity.Point;
import ru.ifmo.backend.entity.Result;
import ru.ifmo.backend.repository.ResultRepository;
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
    public List<Result> getAllResults() {
        return  resultRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Transactional
    public void add(Point point) {
        String time = formatter.format(ZonedDateTime.now(ZoneId.of("Europe/Moscow")));
        Result result = Result.builder()
                .x(point.getX())
                .y(point.getY())
                .r(point.getR())
                .time(time)
                .success(point.isSuccess())
                .build();
        resultRepository.save(result);
    }
}
