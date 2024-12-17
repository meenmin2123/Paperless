<h1>Paperless</h1>
<p>Spring Boot + React + AWS 활용한 전자결재 워크플로우 시스템</p>

<h1>⌚개발 기간</h1>
<ul>
  <li>24.09.25 ~ 24.11.11</li>
</ul>

<h1>👨‍👦‍👦역할 분담</h1>
<ol>
  <li> <b> ming </b>
    <br>📝 전자 결재 기능 및 화면 구현
    <br>📦 재고 관리 기능
    <br>👥 직원 관리 기능 및 화면 구현
    <br>🏢 조직도 기능 및 화면 구현
  </li>
  <li> <b> ocy </b>
    <br>📥 전자 결재함 화면 구현
    <br>✉️ 메일 기능 및 화면 구현
  </li>
  <li> <b> bs </b>
    <br>💬 채팅 관련 기능 및 화면 작업
  </li>
  <li> <b> alsehdns </b>
    <br>🏠 홈페이지 메인
    <br>🔐 로그인
    <br>🛠️ 시스템 관리자 기능 및 화면 구현
  </li>
</ol>

<h1>🖥️개발 환경</h1>
  <ul>
      <li>Java 11</li>
      <li>JDK: 11.0.0.1</li>
      <li>Framework: Spring Boot 2.7.6, Spring MVC</li>
      <li>ORM: JPA, MyBatis</li>
      <li>보안: Spring Security (Core, Web, Config), JWT</li>
      <li>AOP: Spring Boot AOP</li>
      <li>배포: Spring Boot Maven Plugin</li>
      <li>기타 라이브러리: AWS SDK (DynamoDB, S3, API Gateway Management API), dotenv</li>
      <li>Database: MySQL</li>
  </ul>

  <h3>프론트엔드</h3>
    <ul>
        <li>언어 및 기술: React, JavaScript, CSS</li>
        <li>라이브러리: Axios (API 통신), Bootstrap (UI 프레임워크)</li>
    </ul>

  <h3>클라우드</h3>
    <ul>
        <li>플랫폼: AWS</li>
        <li>서비스: EC2, S3, DynamoDB</li>
    </ul>

  <h3>주요 도구</h3>
    <ul>
        <li>개발 도구: IntelliJ IDEA, Visual Studio Code</li>
        <li>빌드 도구: Maven</li>
        <li>테스트 도구: Postman</li>
        <li>형상 관리: Git, GitHub</li>
    </ul>
    
  <h3>⚙프로젝트 환경 설정</h3>
  <ul>
    <li><b>Font :</b> 원스토어 모바일고딕 본문체</li>
  </ul>

<h3>🎮사용 API 목록</h3>
<ol>
  <li>ckeditor5</li>
  <li>FullCalendar</li>
  <li>pdf 변환기 api-itext</li>
  <li>네이버 윅스 이메일 인증 api</li>
  <li>AWS - lambda, DynamoDB, WebSocket API,REST API, S3</li>
</ol>

<h1>💼주요 기능</h1>
<h3>공통 기능</h3>
<ol>
  <li>🔐 로그인</li>
  <ul>
    <li>사용자 정보 확인 (시스템 관리자, 기업별 관리자, 기업별 사용자 구분 및 메뉴 구성)</li>
    <li>메인화면, 메일함, 최근 결재한 목록, 캘린더 등 기능</li>
  </ul>

  <li>📄 전자 결재</li>
  <ul>
    <li>보고서 목록</li>
      <p>- 보고서 목록 출력 기능 (정렬 기준: 최신순, 결재순, 상신순)</p>
      <p>- 보고서 제목/담당자 검색 기능</p>
      <p>- 페이징 기능</p>
    <li>보고서 작성</li>
      <p>- 보고서 양식 form 제공 (휴가 신청서, 업무 보고서, 구매/발주 신청서)</p>
      <p>- 결재자 지정, 참조자/수신자 지정</p>
      <p>- 임시 저장 기능</p>
    <li>보고서 수정</li>
      <p>- 기존 보고서 내용 불러오기 기능 (상신 취소 상태에서만 수정 가능)</p>
    <li>보고서 읽기</li>
      <p>- 보고서 내용 출력 기능</p>
      <p>- 결재 완료 상태 PDF 변환 및 내보내기 기능</p>
    <li>보고서 발송</li>
      <p>- 발송 전 미리보기 기능</p>
    <li>보고서 승인</li>
      <p>- 승인 후 페이지 이동</p>
    <li>보고서 반려</li>
      <p>- 반려 전 반려 사유 작성</p>
  </ul>

  <li>📧 이메일 기능</li>
  <ul>
    <li>이메일 목록</li>
      <p>- 이메일 정보 목록 불러오기 (최신순)</p>
      <p>- 검색 기능 (키워드: 제목, 발신자)</p>
    <li>이메일 작성</li>
      <p>- 첨부파일 저장 기능</p>
    <li>이메일 삭제</li>
      <p>- 삭제 시, 휴지통으로 이동</p>
      <p>- 휴지통에서 영구 삭제 기능 구현</p>
  </ul>

  <li>⚙️ 마이페이지</li>
  <ul>
    <li>기본 정보 조회 (사번, 소속 부서, 연차 정보)</li>
    <li>정보 수정 기능 (전화번호, 비밀번호 변경 기능)</li>
  </ul>
</ol>

<h3>공통 기능</h3>
<ol>
  <li>💬 채팅 기능</li>
  <ul>
    <li>담당자 채팅</li>
    <p>- 채팅 목록 불러오기 (최신순 정렬)</p>
    <p>- 담당자 정보 불러오기</p>
    <p>- 기존 채팅 내용 불러오기</p>
    <p>- 실시간 채팅 기능</p>
  </ul>

  <li>📅 일정 관리</li>
  <ul>
    <li>일정 표시 불러오기</li>
    <li>일정 내용 작성</li>
    <li>일정 표시 색상/아이콘 변경</li>
    <li>일정 삭제</li>
    <li>일정 변경</li>
  </ul>
</ol>
