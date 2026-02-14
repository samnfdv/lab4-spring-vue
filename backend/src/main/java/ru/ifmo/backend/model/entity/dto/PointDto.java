package ru.ifmo.backend.model.entity.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.ifmo.backend.model.entity.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointDto {

    @NotNull
    private int x;

    @NotNull
    private double y;

    @NotNull
    private int r;

    @NotNull
    private User user;
}

