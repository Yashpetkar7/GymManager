import { useState } from 'react'
import Login from './LoginPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import AdminDashboard from './Admin';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/LoginPage" element={<Login />} />
        <Route path="/Admin" element={<AdminDashboard />} />
        <Route path="/" element={<div>Home Page or Landing Page</div>} />
      </Routes>
    </Router>
    </>
  )
}

export default App