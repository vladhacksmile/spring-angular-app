package com.vladhacksmile.springbackend.controllers;

import com.vladhacksmile.springbackend.models.User;
import com.vladhacksmile.springbackend.requests.PointRequest;
import com.vladhacksmile.springbackend.service.PointService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/points")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class PointController {
	private final PointService pointService;

	public PointController(PointService pointService) {
		this.pointService = pointService;
	}

	@PostMapping()
	public ResponseEntity<?> add(@AuthenticationPrincipal User user, @Valid @RequestBody PointRequest pointRequest) {
		return pointService.add(user, pointRequest);
	}

	@GetMapping
	public @ResponseBody Iterable<?> getAllPoints(@AuthenticationPrincipal User user) {
		return user.getRequests();
	}

	@DeleteMapping
	public ResponseEntity<?> clearAllPoints(@AuthenticationPrincipal User user) {
		return pointService.clearAllPoints(user);
	}

}