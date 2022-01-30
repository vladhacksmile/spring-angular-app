package com.vladhacksmile.springbackend.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class PointRequest {
    @Min(value = -5, message = "Координата X не менее -5!")
    @Max(value = 5, message = "Координата X не более 5!")
    private float x;
    @Min(value = -5, message = "Координата Y не менее -5!")
    @Max(value = 5, message = "Координата Y не более 5!")
    private float y;
    @Min(value = 1, message = "Радиус не менее 1!")
    @Max(value = 5, message = "Радиус не более 5!")
    private float r;
    private Long time;
}
