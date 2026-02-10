package ru.ifmo.backend.entity;


import lombok.*;

import java.io.Serializable;


@Data
@NoArgsConstructor
public class Point implements Serializable {
    private int x;
    private double y;
    private int r;
    private boolean success= checkHit();

    public boolean checkHit() {

        if (x <= 0 && x >= -r && y >= 0 && y <= r / 2.0) {
            return true;
        }

        if (x <= 0 && y <= 0 && (x + y >= -r)) {
            return true;
        }

        if (x >= 0 && y <= 0 && (x * x + y * y <= r * r)) {
            return true;
        }
        return false;
    }
}