import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Login from './utils/Login';
import Logout from "./utils/Logout"
import Home from './components/Home';
import Reservation from './components/Reservation';
import Orders from './components/Orders';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div className="App">
          <Navbar bg="primary" expand="lg" sticky="top" variant="dark">
            <Container className="container-fluid">
              <Navbar.Brand as={Link} to="/">
                <img src="/badminton-logo.png" alt="badminton logo" className="badmintonLogo"/>
                Bellevue Badminton Club
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/reservation">Reservation</Nav.Link>
                  {
                    user && <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                  }
                </Nav>
              </Navbar.Collapse>
              <div className="auth-button">
                {user ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={user.picture} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    <span>{user.name}</span>
                    <Logout setUser={setUser} />
                  </div>
                ) : (
                  <Login setUser={setUser} />
                )}
              </div>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservation" element={<Reservation login={user} />} />
            <Route path="/orders" element={<Orders login={user} />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
