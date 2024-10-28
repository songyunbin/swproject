import React from 'react';
import KakaoMap from './KakaoMap';
import './App.css';
import {Link} from 'react-router-dom';
import Header from './layout/Header.js';

function App() {
    return (
        <>
            <Header/>
            <div>
                <KakaoMap />
            </div>
        </>
    );
}

export default App;
