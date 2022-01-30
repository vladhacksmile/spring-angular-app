package com.vladhacksmile.springbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "user_requests")
public class Request {
    @Id
    @GeneratedValue
    @JsonIgnore
    private Long id;
    private float x;
    private float y;
    private float r;
    private boolean belong;
    private float executionTime;
    private String executionDate;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    public Request(float x, float y, float r, boolean belong, float executionTime, String executionDate, User user) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.belong = belong;
        this.executionTime = executionTime;
        this.executionDate = executionDate;
        this.user = user;
    }
}
