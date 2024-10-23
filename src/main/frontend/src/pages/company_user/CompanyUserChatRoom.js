import React, { useEffect, useState } from 'react';
import api from '../layout/api';
import styles from '../../styles/company/company_chatroom.module.css';
import OrgChart from '../layout/org_chart';
import { Button, Modal } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

function CompanyUserChatRoom() {
    const [searchParams] = useSearchParams();
    const empNo = Number(searchParams.get('emp_no'));

    // ** 더미 데이터를 이용하여 로그인 객체 하드코딩 ** //
    // const empNo = 1; // 현재 로그인한 사용자

    const [user, setUser] = useState(null); // 상태 변수로 사용자 정보를 초기화

    // 직원 정보 저장 로직
    useEffect(() => {
        // empList에서 empNo와 일치하는 직원 찾기
        const foundUser = empList.find(emp => emp.emp_no === empNo);

        if (foundUser) {
            setUser(foundUser);
        }
    }, [empNo]); // empNo가 변경될 때마다 실행

    // ** 더미 데이터 ** //
    // 직원
    const empList = [
        { emp_no: 1, emp_name: '배수지', emp_email: 'suji0123@naver.com', emp_phone: '010-9876-5432', emp_profile: 'https://via.placeholder.com/60', emp_comp_no: 1, emp_dept_no: 0, emp_team_name: '', emp_posi_no: 6},
        { emp_no: 2, emp_name: '장원영', emp_email: 'jang0101@naver.com', emp_phone: '010-1234-1234', emp_profile: 'https://via.placeholder.com/60', emp_comp_no: 1, emp_dept_no: 0, emp_posi_no: 7},
        { emp_no: 3, emp_name: '박보영', emp_email: 'boyoung0202@naver.com', emp_phone: '010-2345-2345', emp_profile: 'https://via.placeholder.com/60', emp_comp_no: 1, emp_dept_no: 0, emp_posi_no: 7},
        { emp_no: 4, emp_name: '박보검', emp_email: 'gumgum0303@gmail.com', emp_phone: '010-3456-3456', emp_profile: 'https://via.placeholder.com/60', emp_comp_no: 1, emp_dept_no: 0, emp_posi_no: 5},
        { emp_no: 5, emp_name: '전지현', emp_email: 'jjh0404@naver.com', emp_phone: '010-4567-4567', emp_profile: 'https://via.placeholder.com/60', emp_comp_no: 1, emp_dept_no: 1, emp_posi_no: 4},
        { emp_no: 6, emp_name: '이도현', emp_email: 'dodo0505@gmail.com', emp_phone: '010-5678-5678', emp_profile: 'https://via.placeholder.com/60', emp_comp_no: 1, emp_dept_no: 0, emp_posi_no: 4},
        { emp_no: 7, emp_name: '김태리', emp_email: 'kimlee0606@gmail.com', emp_phone: '010-6789-6789', emp_profile: 'https://via.placeholder.com/60', emp_comp_no: 1, emp_dept_no: 0, emp_posi_no: 5},
        { emp_no: 8, emp_name: '강동원', emp_email: 'dongwon0707@naver.com', emp_phone: '010-7890-7890', emp_profile: 'https://via.placeholder.com/60', emp_comp_no: 1, emp_dept_no: 0, emp_posi_no: 3},
    ];

    // 회사
    const compList = [
	{ comp_no: 0, comp_name: 'IT 대표 업체' },
	{ comp_no: 1, comp_name: 'Paperless' },
    ];

    // 부서
    const deptList = [
        { dept_no: 0, dept_name: 'it 개발부', dept_team_name: '콘텐츠 기획팀' },
        { dept_no: 1, dept_name: 'it 개발부', dept_team_name: 'SW 개발팀'},
    ];
    
    // 직급
    const posiList = [
        { posi_no: 0, posi_name: '대표' },
        { posi_no: 1, posi_name: '사장' },
        { posi_no: 2, posi_name: '부장' },
        { posi_no: 3, posi_name: '차장' },
        { posi_no: 4, posi_name: '과장' },
        { posi_no: 5, posi_name: '팀장' },
        { posi_no: 6, posi_name: '대리' },
        { posi_no: 7, posi_name: '사원' },
    ];

    // 직원 목록을 각 회사 정보와 함께 저장할 배열
    const processedEmpList = empList.map(emp => {
        const company = compList.find(comp => comp.comp_no === emp.emp_comp_no); // emp_comp_no와 일치하는 회사 정보 찾기
        const department = deptList.find(dept => dept.dept_no === emp.emp_dept_no); // 해당 부서 정보 찾기
        const team = deptList.find(dept => dept.dept_team_name === emp.emp_team_name);
        const position = posiList.find(posi => posi.posi_no === emp.emp_posi_no); // 해당 직급 정보 찾기
  
        return {
        ...emp,
        company_name: company ? company.comp_name : 'Unknown', // 회사 이름 동적 참조
        department_name: department ? department.dept_name : 'Unknown', // 부서 이름 동적 참조
        team_name: team ? team.dept_team_name : 'Unknown', // 팀 이름 동적 참조
        position_name: position ? position.posi_name : 'Unknown' // 직급 이름 동적 참조
        };
    });

    // 채팅방 목록 상태 변수 (초기에는 빈 배열)
    const [chatRoomList, setChatRoomList] = useState([]);

    // 가장 최근 메시지 저장하는 객체
    const [recentMessages, setRecentMessages] = useState({});

    // [프로필 모달창]
    // 프로필 모달창 상태 변수
    const [profileModal, setProfileModal] = useState(false);

    // 프로필 데이터에 대한 변수
    const [profileInfo, setProfileInfo] = useState('');

    // 모달창 상태 메서드 (Close)
    const closeProfileModal = () => {
        setProfileModal(false);
    };

    // 채팅 목록의 프로필 클릭할 때 메서드
    const clickProfile = (name) => {
        // 클릭한 프로필의 name과 empList 비교하여 데이터를 저장하는 변수
        const emp = empList.find(emp => emp.name === name);
        setProfileInfo(emp);
        setProfileModal(true);
    }

    // [chatting]
    // 창이 열려있는지 확인하는 변수
    const [openChats, setOpenChats] = useState([]);

    // 새 창이 열릴 때마다 위치 조정해주는 변수
    const [offsetDown, setOffsetDown] = useState(0);
    const [offsetRight, setOffsetRight] = useState(0);

    // 채팅 새 창
    const chatting = async (room_no) => {
        try {
            // 해당 room_no의 모든 메시지를 가져오기
            const chatMessagesResponse = await api.getMessagesByRoomNo(room_no);
            const chatMessages = chatMessagesResponse.data;

            // 해당 room_no의 채팅방 정보 찾기
            const room = chatRoomList.find(room => room.room_no === room_no);

            if (room) {
                const openChatRoom = openChats.find(chat => chat.room_no === room_no);

                if (openChatRoom && openChatRoom.window && !openChatRoom.window.closed) {
                     // 열려있는 창 중에 같은 room_no의 창이 있다면 해당 창 보여주기
                    openChatRoom.window.focus();
                } else {
                // 참가자 정보와 메시지 저장
                // JSON.stringify: 문자열로 저장
                localStorage.setItem(`chatting-room-${room_no}`, JSON.stringify({
                    room_no,
                    participants: room.participantNames,
                    messages: chatMessages
                }));

                // 위치 조정
                if (offsetRight >= 100) {
                    setOffsetDown(20);
                    setOffsetRight(0);
                }

                // 새 창 띄우기
                const newChat = window.open(
                    `/chatting/${room_no}`,
                    `Chat Room ${room_no}`,
                    `width=800, height=600, top=${100 + offsetDown}, left=${1000 + offsetRight}, scrollbars=yes, resizable=no`
                );

                // 새 창 데이터 추가
                setOpenChats(preOpenChats => [
                    ...preOpenChats,
                    { room_no, window: newChat }
                ]);

                // 다음 창의 위치 조정
                setOffsetDown(preOffsetDown => preOffsetDown + 20);
                setOffsetRight(preOffsetRight => preOffsetRight + 20);
            }
        } else {
            console.warn(`No chat room found with room_no: ${room_no}`);
        }
    } catch (error) {
        console.error("Error opening chat: ", error);
    }
};

    // 페이지가 로드될 때 모든 채팅방 목록을 불러오는 메서드
    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                // user가 null인 경우 API 요청을 중지
                if (!user || !user.emp_no) {
                console.error("User is not set yet or emp_no is missing.");
                return;
            }

                // 1. 사용자 emp_no로 모든 채팅방 목록 가져오기
                const chatRoomResponse = await api.getChatRoomsByParticipant(user.emp_no);
                // 서버에서 받아온 채팅방 데이터
                const chatRooms = chatRoomResponse.data;

                // 서버 응답이 배열인지 확인하고, 배열이 아니면 응답의 특정 키에서 배열을 추출
                if (Array.isArray(chatRooms)) {
                    // 각 채팅방의 room_participants를 처리하여 참가자 이름 문자열 생성
                    const processedChatRooms = chatRooms.map(room => {
                            // 로그인 사용자 제외한 다른 참가자 저장
                            const otherParticipants = room.room_participants.filter(participant => participant.N !== String(user.emp_no)).map(participant => {
                                const emp = empList.find(e => e.emp_no === Number(participant.N));
                                return emp ? emp.emp_name : '';
                        });

                        // 참가자 이름을 문자열로 변환
                        const participantNames = otherParticipants.join(', ');

                        // 각 room에 participantNames 추가
                        return {
                            ...room,
                            participantNames
                        };
                    });

                    setChatRoomList(processedChatRooms); // 채팅방 목록을 배열로 설정
                    console.log("chatRoomList:", chatRoomList);

                    // 2. chatRooms로 각 채팅방의 room_no로 가장 최근 메시지 불러오기
                    const allRecentMessages = await Promise.all(
                        chatRooms.map(async (room) => {
                            const chatResponse = await api.getMostRecentMessageByRoomNo(room.room_no);
                            // 가장 최근 메시지 저장, 없으면 빈 객체로 저장
                            const recentMessage = chatResponse.data || {};

                            const chatCountResponse = await api.getChatCountByRoomNo(room.room_no);
                            const unreadCount = chatCountResponse.data.count || 0;

                            return {
                                room_no: room.room_no,
                                chat_content_recent: recentMessage.content || '',
                                chat_date_recent: recentMessage.chat_date || '',
                                participantNames: room.participantNames, // 참가자 이름 문자열 포함
                                unread: unreadCount
                            };
                        })
                    );

                     // 가장 최근 메시지를 room_no를 키로 하는 객체로 변환하여 상태 업데이트
                    const messagesObj = allRecentMessages.reduce((acc, roomData) => {
                        acc[roomData.room_no] = {
                            chat_content_recent: roomData.chat_content_recent,
                            chat_date_recent: roomData.chat_date_recent,
                            participantNames: roomData.participantNames, // 추가된 참가자 이름
                            unread: roomData.unread
                        };
                        return acc;
                    }, {});
                    setRecentMessages(messagesObj);
                } else {
                    console.error("채팅방 목록 데이터가 배열 형태가 아닙니다:", chatRoomResponse);
                }
            } catch (error) {
                console.error('채팅방 목록을 불러오는 중 오류 발생:', error);
            }
        };
        if (user) {
            fetchChatRooms();
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-xl">
            <div className={styles.chatContainer}>
                <div className={styles.list}>
                    <div className={styles.orgChart}>
                        <div className={styles.orgChart_title}>
                            <h3>조직도</h3>
                        </div>
                        <div className={styles.orgChart_content}>
                            <div className={styles.selectOrgChart}>
                                <input type='text' placeholder='성명, 직급, 부서명 검색'></input>
                                <button><i className="material-icons">search</i></button>
                            </div>
                            <hr>
                            </hr>
                            <div className={styles.orgChartUI}>
                                <OrgChart />
                            </div>
                        </div>
                    </div>
                    <div className={styles.chatRoomList}>
                        <div className={styles.chatRoomList_title}>
                            <h3>채팅 목록</h3>
                        </div>
                        <div className={styles.chatRoomList_content}>
                            {chatRoomList.map((room) => (
                                <div key={room.room_no} className={styles.eachChat} onClick={() => chatting(room.room_participants)} >
                                    <div className={styles.eachChat_profile} onClick={(e) => { e.stopPropagation(); clickProfile(room.room_participants); }}>
                                        <img src="https://via.placeholder.com/60" alt="Profile" className={styles.image} />
                                    </div>
                                    <div className={styles.eachChat_info}>
                                        <div className={styles.eachChat_row}>
                                            <div className={styles.eachChat_name}>
                                                {room.room_participants}
                                            </div>
                                            <div className={styles.eachChat_lastTime}>
                                                {recentMessages[room.room_no]?.chat_date_recent}
                                            </div>
                                        </div>
                                        <div className={styles.eachChat_row}>
                                            <div className={styles.eachChat_content}>
                                                {recentMessages[room.room_no]?.chat_content_recent}
                                            </div>
                                            <div className={styles.eachChat_unread} style={{ display: recentMessages[room.room_no]?.unread === 0 ? 'none' : 'block' }}>
                                                {recentMessages[room.room_no]?.unread}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Modal show={profileModal} onHide={closeProfileModal} dialogClassName={styles.modal_content} size='lg' centered>
                                <Modal.Header className={styles.modal_header} closeButton onClick={(e) => e.stopPropagation()}>
                                    <Modal.Title className={styles.modal_title}>{profileInfo.name} 님의 프로필</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className={styles.modal_body}>
                                        <div className={styles.modal_body_profile}>
                                            <img src="https://via.placeholder.com/180" alt="Profile" className={styles.image} />
                                        </div>
                                        <div className={styles.modal_body_info}>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td><h5 className={styles.infoTitle}>소속 부서</h5></td>
                                                        <td><p className={styles.infoValue}>{profileInfo.dept}</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h5 className={styles.infoTitle}>내선 번호</h5></td>
                                                        <td><p className={styles.infoValue}>{profileInfo.phone}</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h5 className={styles.infoTitle}>이 &nbsp;메 &nbsp;일</h5></td>
                                                        <td><p className={styles.infoValue}>{profileInfo.email}</p></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className={styles.modal_footer}>
                                    <Button variant="primary" onClick={(e) => { e.stopPropagation(); closeProfileModal() }} >
                                        메일 전송
                                    </Button>
                                    <Button variant="primary" onClick={(e) => { e.stopPropagation(); chatting(profileInfo.name); closeProfileModal() }} >
                                        채팅하기
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyUserChatRoom;

    // // 채팅 목록 (더미 데이터)
    // const chatList1 = [
    //     {
    //         profile: 'https://via.placeholder.com/75', name: '장원영', content: `수지야
    //         오늘 점심 뭐 먹지?`, lastTime: '2024-10-15 11:30', unread: 2
    //     }, => chat에서 불러올 내용은 content, lastTime, unread
    //     {
    //         profile: 'https://via.placeholder.com/75', name: '박보영', content: `대리님, 프레젠테이션 자료 이메일로 전송했습니다.
    //         확인 부탁드립니다.`, lastTime: '2024-10-15 09:15', unread: 1
    //     },
    //     {
    //         profile: 'https://via.placeholder.com/75', name: '박보검', content: `대리님, 요청하신 파일 보내드렸습니다.
    //         확인하시고, 각 부서에 전달 바랍니다.
    //         회의할 때 10부만 복사해주세요.`, lastTime: '2024-10-14 16:00', unread: 0
    //     },
    //     {
    //         profile: 'https://via.placeholder.com/75', name: '전지현', content: `안녕하세요, 전지현입니다.
    //         오늘 회의 내용 두 분이서 정리하시고 보고 부탁드립니다.`, lastTime: '2024-10-14 14:32', unread: 0
    //     },
    //     {
    //         profile: 'https://via.placeholder.com/75', name: '이도현', content: `대리님, 지난 달 매출 정리하신 파일 보고서 찾았습니다!
    //         감사합니다~`, lastTime: '2024-10-11 11:30', unread: 0
    //     },
    //     {
    //         profile: 'https://via.placeholder.com/75', name: '김태리', content: `대리님, 안녕하세요. 
    //         오늘 회의 참석 가능하실까요?`, lastTime: '2024-10-10 10:30', unread: 0
    //     },
    //     { profile: 'https://via.placeholder.com/75', name: '강동원', content: `대리님, 커피 어떤 거 드실래요?`, lastTime: '2024-10-09 09:00', unread: 0 },
    //     {
    //         profile: 'https://via.placeholder.com/75', name: '광고인', content: `[Web발신]
    //         (광고) 공식몰
    //         단 하루 100원 판매!`, lastTime: '2024-10-08 12:00', unread: 10
    //     },
    // ];