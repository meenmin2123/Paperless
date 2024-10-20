package com.ss.paperless.python;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class PythonLoggingAspect {

    @Before("execution(* com.ss.paperless.python..*(..))")
    public void PythonLogBefore(JoinPoint joinPoint) {
        // 실행되는 메서드 호출
        log.info("Python_Log Before : " + joinPoint.getSignature().getName()+"()");
    }

    @After("execution(* com.ss.paperless.python..*(..))")
    public void PythonLogAfter(JoinPoint joinPoint) {
        log.info("Python_Log After : " + joinPoint.getSignature().getName()+"()");
    }
}
