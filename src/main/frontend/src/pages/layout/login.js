import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import logo from '../../img/logo-img.png';
import axios from 'axios';

import '../../styles/layout/login.css';
import '../../styles/style.css';

function Login() {
    const [empId, setEmpId] = useState('');
    const [empPw, setEmpPw] = useState('');
    const navigate = useNavigate();

    const handleIdChange = (event) => {
        setEmpId(event.target.value);
    };

    const handlePwChange = (event) => {
        setEmpPw(event.target.value);
    };

    const postLogin = async (empId, empPw) => {
        try {
            const response = await axios.post('http://localhost:8080/login', {
                username: empId,
                password: empPw,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            console.log(response);
            const token = response.headers['authorization']; // 'authorization'에 JWT가 담겨 있다고 가정

        if (token) {
            // 로컬 스토리지에 JWT 저장
            localStorage.setItem('jwt', token);
            console.log('토큰 저장 완료!:', localStorage.getItem('jwt'));
            navigate('/company/user/');
        } else {
            console.error('토큰을 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('로그인 실패:', error.response ? error.response.data : error.message);
    }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log('ID:', empId);
        console.log('Password:', empPw);
        postLogin(empId, empPw); 
    };

    return (
        <div className='loginForm_container'> 
            <form className='loginForm' onSubmit={handleSubmit}>
                <img src={logo} className='loginForm_logo' alt="Logo" />
                <div className='subtitle'>
                    <p className='input_id_sub'>아이디</p>
                </div>
                <input type="text"
                className='input_id'
                    id="empId"
                    value={empId}
                    onChange={handleIdChange} />

                <div className='subtitle'>
                    <p className='input_id_sub'>비밀번호</p>
                </div>
                <input type="password"
                className='input_pw'
                    id="empPw"
                    value={empPw}
                    onChange={handlePwChange} />

                <button type="submit" className="login_btn">
                    로그인
                </button>
                <div className='searchPW_container'>    
                    <p className='searchPW'> 비밀번호를 잊으셨나요? </p>
                    <Link to={'/email_Auth'} className='searchPW_link'>비밀번호 찾기</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;