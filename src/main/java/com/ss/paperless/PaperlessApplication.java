package com.ss.paperless;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableScheduling
public class PaperlessApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().directory("./") // 프로젝트 루트 디렉토리
				.ignoreIfMalformed().ignoreIfMissing().load();
		System.setProperty("AWS_ACCESS_KEY_ID", dotenv.get("AWS_ACCESS_KEY_ID"));
		System.setProperty("AWS_SECRET_ACCESS_KEY", dotenv.get("AWS_SECRET_ACCESS_KEY"));
		System.setProperty("AWS_REGION", dotenv.get("AWS_REGION"));
		System.setProperty("AWS_S3_BUCKET", dotenv.get("AWS_S3_BUCKET"));

		SpringApplication.run(PaperlessApplication.class, args);
	}
}
