package com.zs.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//docker run --rm   --name pg-docker -e POSTGRES_PASSWORD=admin -d -p 5432:5432 postgres
@SpringBootApplication
public class PortfolioApplication {

	public static void main(String[] args) {
		SpringApplication.run(PortfolioApplication.class, args);
	}

}
