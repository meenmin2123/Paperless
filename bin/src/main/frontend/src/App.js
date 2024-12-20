// src/main/frontend/src/App.js

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Home from './pages/layout/home';
import Inquiry from './pages/common/inquiry';
import Login from './pages/layout/login';
import Inquiry_Success from './pages/common/inquiry_success';
import Inquiry_write from './pages/common/inquiry_write';
import Email_Auth from './pages/layout/email_auth';
import System_admin_inquiry from './pages/system_admin/system_admin_inquiry';
import System_admin_member from './pages/system_admin/system_admin_member';
import Company_admin_main from './pages/company_admin/company_admin_main';
import Company_admin_memeber from './pages/company_admin/company_admin_member';
import Company_admin_email from './pages/company_admin/company_admin_email';
import Company_admin_email_send from './pages/company_admin/company_admin_email_send';
import Company_admin_approval from './pages/company_admin/company_admin_approval';
import Company_admin_approval_detail from './pages/company_admin/company_admin_approval_detail';
import Company_user_main from './pages/company_user/company_user_main';
import Company_user_mypage from './pages/company_user/company_user_mypage';
import Company_user_email from './pages/company_user/company_user_email';
import Company_user_email_send from './pages/company_user/company_user_email_send';
import Company_user_draft_write from './pages/company_user/company_user_draft_write';
import Company_user_draft_detail from './pages/company_user/company_user_draft_detail';
import Company_user_dratf_list from './pages/company_user/company_user_draft_list';
import Company_user_chat from './pages/company_user/company_user_chat';



import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {
   const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/inquiry' element={<Inquiry />} />
                <Route path='/inquiry/success' element={<Inquiry_Success />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Email_Auth' element={<Email_Auth />} />
                <Route path='/inquiry/wirte' element={<Inquiry_write/>}/>
                <Route path='/System/admin/inquiry' element={<System_admin_inquiry />} />
                <Route path='/System/admin/member' element={<System_admin_member />} />
                <Route path='/Company/admin/' element={<Company_admin_main />} />
                <Route path='/Company/admin/member' element={<Company_admin_memeber />} />
                <Route path='/Company/admin/email' element={<Company_admin_email />} />
                <Route path='/Company/admin/email/send' element={<Company_admin_email_send />} />
                <Route path='/Company/admin/approval' element={<Company_admin_approval />} />
                <Route path='/Company/admin/approval/detail' element={<Company_admin_approval_detail />} />
                <Route path='/Company/user/' element={<Company_user_main />} />
                <Route path='/Company/user/mypage' element={<Company_user_mypage />} />
                <Route path='/Company/user/email' element={<Company_user_email />} />
                <Route path='/Company/user/email/send' element={<Company_user_email_send />} />
                <Route path='/Company/user/draft/list' element={<Company_user_dratf_list />} />
                <Route path='/Company/user/draft/detail' element={<Company_user_draft_detail />} />
                <Route path='/Company/user/draft/write' element={<Company_user_draft_write />} />
                <Route path='/Company/user/chat' element={<Company_user_chat />} />
                
                
            </Routes>
        </Router>
    );
}

export default App;