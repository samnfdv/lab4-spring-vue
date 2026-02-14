package ru.ifmo.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.ifmo.backend.model.entity.Result;

import java.util.List;


@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findAllByUserName(String name);}
