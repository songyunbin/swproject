import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'

export default function Header(){
    return(
        <div className='header'>
                <div className="logo">
                     <img src="./refreshlogo.png" alt="로고" />
                </div>
                <nav className="navigation">
                    <ul>
                        <li>
                            <Link className = "header-nav-item" to='/category'>
                                카테고리별
                            </Link>
                        </li>
                       <li>
                            <Link className = "header-nav-item" to='/myinfo'>
                                내정보
                             </Link>
                       </li>
                       <li>
                             <Link className = "header-nav-item" to='/bookmark'>
                                북마크
                             </Link>
                       </li>
                       <li>
                            <Link className = "header-nav-item" to='/writeform'>
                                글쓰기
                             </Link>
                       </li>
                    </ul>
                </nav>


                <input type="text" className = "search-bar" placeholder="검색어를 입력하세요." />
                <ul>
                    <li>
                        <Link className = "header-nav-item" to="/login">
                            로그인
                        </Link>
                    </li>
                </ul>
        </div>
    );
}

