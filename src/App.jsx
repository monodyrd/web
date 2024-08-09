import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { Button,message } from "antd";
import HomePage from "./pages/HomePage";
import BadmintonBooking from "./pages/BadmintonBooking";
import Orders from "./pages/Orders";
import {sessionSet} from "./utils/login"

function App() {
  let l = sessionStorage.getItem('token')?true:false
  const [login, setLogin] = useState(l);
  const Login = () => {
    sessionSet()
    setLogin(true);
    message.success("登陆成功")
  };
  return (
    <Router>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          // justifyContent:'center',
          alignItems: "center",
        }}
      >
        <div className="head">
        <NavLink style={{fontSize:"24px"}} to={"/"}><h1>场馆订票系统</h1></NavLink>
          <div className="link">
            <NavLink style={{fontSize:"24px"}} to={"/"}>home</NavLink>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink style={{fontSize:"24px"}} to={"/badminton"}>badminton</NavLink>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink style={{fontSize:"24px"}} to={"/orders"}>orders</NavLink>
          </div>
          <div>
            <Button
              type="primary"
              onClick={Login}
              style={{fontSize:"24px"}}
            >
              Login
            </Button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/badminton" element={<BadmintonBooking login={login} />}  />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
