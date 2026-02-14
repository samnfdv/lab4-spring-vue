package ru.ifmo.backend.model.entity.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultDto {

    private int x;

    private double y;

    private int r;

    private boolean success;

    private String time;

}
