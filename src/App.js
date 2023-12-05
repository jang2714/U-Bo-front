import './App.css';
import Header from './component/Header';
import Home from './component/Home';
import RendtalBoard from "./component/RentalBoard";
import Login from './component/Login';
import Chat from './component/Chat';
import Mypage from './component/Mypage';
import {BrowserRouter, Route, Router, Routes, useLocation} from "react-router-dom";
import ProductBoard from "./component/ProductBoard";
import ProductDetail from "./component/ProductDetail";
import ProductCreate from "./component/ProductCreate";
import Main from "./component/Login";
import {useState} from "react";
import React from "react";
import SignupBox from "./component/SignupBox";
import FindPasswd from "./component/FindPasswd";
import Search from "./component/Search";
import RentalCreate from "./component/RentalCreate";
import RentalDetail from "./component/RentalDetail";
import ChatRoom from "./component/ChatRoom";

function App() {



    return (
        <BrowserRouter>
            <div className="App">

                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<Login />} />
                        <Route path="/signup_box" element={<SignupBox/>}/>
                        <Route path="/find_passwd" element={<FindPasswd/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/search/:search" element={<Search/>}/>
                        <Route path="/product_board" element={<ProductBoard />} />
                        <Route path="/product_board/:id" element={<ProductDetail />} />
                        <Route path="/rental_board" element={<RendtalBoard />} />
                        <Route path="/rental_board/:id" element={<RentalDetail/>}/>
                        <Route path="/rental_create" element={<RentalCreate/>}/>
                        <Route path="/chat" element={<ChatRoom/>} />
                        <Route path="/mypage" element={<Mypage />} />
                        <Route path="/product_create" element={<ProductCreate />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;
