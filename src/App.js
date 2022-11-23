import './App.css';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Home } from './pages/Home';
import { Auth } from './components/Auth';
import { User } from './pages/User';

const axiosInstance = axios.create({
    withCredentials: true,
});

export const AppContext = React.createContext();

function App() {
    return (
        <AppContext.Provider value={{
            axios: axiosInstance
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/registration" element={<Registration />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/user" element={<User/>}/>
                    <Route path="/" element={
                        <Auth>
                            <Home/>
                        </Auth>
                    } />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
