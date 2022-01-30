package com.vladhacksmile.springbackend.service;

import com.vladhacksmile.springbackend.models.Request;
import com.vladhacksmile.springbackend.models.User;
import com.vladhacksmile.springbackend.utils.MessageResponse;
import com.vladhacksmile.springbackend.requests.PointRequest;
import com.vladhacksmile.springbackend.repository.RequestRepository;
import com.vladhacksmile.springbackend.utils.PointUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class PointService {

    @Autowired
    RequestRepository requestRepository;

    public ResponseEntity<?> add(User user, PointRequest pointRequest){
        if(PointUtils.validate(pointRequest)) {
            Long time = System.currentTimeMillis() - pointRequest.getTime();
            Request request = new Request(pointRequest.getX(), pointRequest.getY(), pointRequest.getR(), PointUtils.isBelong(pointRequest.getX(), pointRequest.getY(), pointRequest.getR()), time, new SimpleDateFormat().format(new Date()), user);
            requestRepository.save(request);
            return ResponseEntity.ok(request);
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Проверьте данные! Координата X [-5; 5], координата Y [-5; 5], R [1; 5]."));
        }
    }

    public ResponseEntity<?> clearAllPoints(User user) {
        requestRepository.deleteRequestsByUser(user);
        return ResponseEntity.ok(new MessageResponse("Таблица очищена!"));
    }

}
