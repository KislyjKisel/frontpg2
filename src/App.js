import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Home } from './pages/Home';
import { Auth } from './components/Auth';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/registration" element={<Registration />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/" element={
                    <Auth>
                        <Home/>
                    </Auth>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
