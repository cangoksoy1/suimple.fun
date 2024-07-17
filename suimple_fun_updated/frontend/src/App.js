
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:4000'); // Your backend URL

function App() {
  const [tokens, setTokens] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('newToken', (token) => {
      setTokens((prevTokens) => [token, ...prevTokens]);
    });

    socket.on('notification', (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Token Dashboard</h1>
        <div className="notifications">
          {notifications.map((notification, index) => (
            <div key={index} className="notification">
              {notification}
            </div>
          ))}
        </div>
        <div className="token-list">
          {tokens.map((token, index) => (
            <div key={index} className="token">
              <h2>{token.name}</h2>
              <p>{token.description}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
