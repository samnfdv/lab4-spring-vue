package ru.ifmo.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.ZonedDateTime;



@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "results")
@Data
public class Result implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Integer x;

    @NotNull
    private Double y;

    @NotNull
    private Integer r;

    @NotNull
    private Boolean success;

    @NotNull
    private String time;

//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    private User owner;
}
