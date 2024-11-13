import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import KakaoMap from './KakaoMap';
import WriteForm from './WriteForm';
import PostList from './PostList';
import './App.css';
import Header from './layout/Header';

function App() {
    const [posts, setPosts] = useState([]); // posts 상태 정의

    const addPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]); // 게시글 추가 함수 정의
    };

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<PostList posts={posts} />} />
                <Route path="/postlist" element={<PostList posts={posts} />} />
                <Route path="/writeform" element={<WriteForm onAddPost={addPost} />} />
                <Route path="/map" element={<KakaoMap />} />
            </Routes>
        </div>
    );
}

export default App;
