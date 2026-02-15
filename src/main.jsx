// src/main.jsx (hoặc index.js)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // <--- DÒNG QUAN TRỌNG NHẤT: Import file CSS vừa tạo ở trên

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)