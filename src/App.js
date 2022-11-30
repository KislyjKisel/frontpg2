import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthRequired } from './components/Auth/Required';
import { AuthProvider } from './components/Auth/Context';
import { AuthProhibited } from './components/Auth/Prohibited';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Home } from './pages/Home';
import { Test } from './pages/Test';


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={
                        <AuthProhibited>
                            <Registration />
                        </AuthProhibited>
                    } />
                    <Route path="/login" element={
                        <AuthProhibited>
                            <Login />
                        </AuthProhibited>
                    } />
                    <Route path="/" element={
                        <AuthRequired redirect='/login'>
                            <Home/>
                        </AuthRequired>
                    } />
                    <Route path="/test" element={
                        <AuthRequired redirect='/login'>
                            <Test/>
                        </AuthRequired>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
