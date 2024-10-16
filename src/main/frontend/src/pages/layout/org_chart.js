import React, { useState } from 'react'
import styles from '../../styles/layout/org_chart.module.css';

const OrgChart = () => {
    const [isDropdown, setIsDropdown] = useState({
        // 회사 내부 조직도
        orgChart: true,
        // CEO
        ceo: false,
        // S/W 연구팀
        swSearch: false,
        // 전략기획팀
        strategicPlanning: false,
        // 경영지원팀
        managementSupport: false,
        // SaaS 운영팀
        saasOperation: false,
        // 서비스 개발팀
        serviceDevelopment: false,
        // 플랫폼팀
        platform: false,
        // 콘텐츠 기획팀
        contentPlanning: false
    });

    const toggleDropdown = (menu) => {
        setIsDropdown((menuState) => ({
            // 이전 setIsDropdown 상태 불러오기
            ...menuState,
            [menu]: !menuState[menu]
        }));
    };

    const menuList = [
        {
            name: '조직도', key: 'orgChart', subMenu: [
                {
                    name: 'CEO', key: 'ceo', subMenu: [
                        { name: '홍길동', key: '홍길동', type: 'user' }
                    ]
                },
                {
                    name: 'S/W 연구팀', key: 'swSearch', subMenu: [
                        { name: '하태홍 전무', key: '하태홍', type: 'user' },
                        { name: 'SaaS 운영팀', key: 'saasOperation', count: 6 },
                        { name: '서비스 개발팀', key: 'serviceDevelopment', count: 8 },
                        { name: '플랫폼팀', key: 'platform', count: 10 },
                        {
                            name: '콘텐츠 기획팀', key: 'contentPlanning', count: 15, subMenu: [
                                { name: '전지현', key: '전지현', type: 'user' },
                                { name: '장원영', key: '장원영', type: 'user' },
                                { name: '이도현', key: '이도현', type: 'user' },
                                { name: '박보영', key: '박보영', type: 'user' },
                                { name: '김태리', key: '김태리', type: 'user' },
                                { name: '박보검', key: '박보검', type: 'user' },
                                { name: '차은우', key: '차은우', type: 'user' },
                                { name: '김수현', key: '김수현', type: 'user' },
                                { name: '마동석', key: '마동석', type: 'user' },
                                { name: '변우석', key: '변우석', type: 'user' },
                                { name: '김지원', key: '김지원', type: 'user' },
                                { name: '박지환', key: '박지환', type: 'user' },
                                { name: '박성훈', key: '박성훈', type: 'user' },
                                { name: '이제훈', key: '이제훈', type: 'user' },
                                { name: '손석구', key: '손석구', type: 'user' },
                            ]
                        }
                    ]
                },
                { name: '전략기획팀', key: 'strategicPlanning' },
                { name: '경영지원팀', key: 'managementSupport' },
            ],
        },
    ]

    const renderMenu = (menu) => {
        const isUser = `${menu.type}` === 'user'? true : false;
        const icon = isDropdown[menu.key] ? `📂` : `📁`;
        return (
            <li key={menu.key} style={{listStyle: 'none'}}>
                <button onClick={() => toggleDropdown(menu.key)} style={{ fontWeight: isDropdown[menu.key] ? 'bold' : 'normal'}}>
                    {isUser ? `🧑‍💼` : icon }
                    {menu.name}
                    {menu.count && ` (${menu.count}명)`}
                </button>
                {isDropdown[menu.key] && menu.subMenu && (
                    <ul className={styles.orgChartList}>
                        {menu.subMenu.map((subMenu) => renderMenu(subMenu))}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <div className={styles.container_orgChart}>
            <ul className={styles.orgChartList}>
                {menuList.map((menu) => renderMenu(menu))}
            </ul>
        </div>
    );
};

export default OrgChart;