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
                    <Route element={<AuthProhibited />}>
                        <Route path="/register" element={<Registration />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route element={<AuthRequired redirect='/login'/>} >
                        <Route path="/" element={<Home />} />
                        <Route path="/test" element={<Test />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
