package ru.ifmo.backend.model.entity.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointAddRequest {
    @NotNull
    private double x;

    @NotNull
    private double y;

    @NotNull
    private int r;

}

