import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Home } from './pages/Home';
import { AuthRequired, AuthProvider, OnlyUnauthenticated } from './components/Auth';


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={
                        <OnlyUnauthenticated redirect='/'>
                            <Registration />
                        </OnlyUnauthenticated>
                    } />
                    <Route path="/login" element={
                        <OnlyUnauthenticated redirect='/'>
                            <Login />
                        </OnlyUnauthenticated>
                    } />
                    <Route path="/" element={
                        <AuthRequired redirect='/login'>
                            <Home/>
                        </AuthRequired>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
