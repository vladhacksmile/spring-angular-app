package com.vladhacksmile.springbackend.requests;

import com.vladhacksmile.springbackend.models.Request;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter

public class SignupRequest {
	@Length(min = 1, message = "Заполните имя пользователя!")
	private String username;
	@Size(min = 6, max = 30, message = "Пароль должен быть не менее 6 символов!")
	private String password;
	private List<Request> requests = new ArrayList<>();
}
