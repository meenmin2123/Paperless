package com.ss.paperless.s3;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class S3Config {
	private static final Logger logger = LoggerFactory.getLogger(S3Config.class);
	@Value("${aws.accessKeyId}")
	private String accessKey;
	@Value("${aws.secretAccessKey}")
	private String secretKey;
	@Value("${aws.region}")
	private String region;

	@Bean
	public AmazonS3 amazonS3() {
        
		BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);
		return AmazonS3ClientBuilder.standard().withRegion(region)
				.withCredentials(new AWSStaticCredentialsProvider(awsCreds)).build();
	}
}