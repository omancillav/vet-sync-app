import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Login } from '@/views/auth/Login.jsx'
import { Register } from '@/views/auth/Register.jsx'
import { Header } from '@/components/header/Header.jsx'
import { Home } from '@/views/Home.jsx'
import { Pets } from '@/views/Pets.jsx'
import { Appointments } from '@/views/Appointments.jsx'
import { Services } from '@/views/Services.jsx'

function AppContent() {
  const location = useLocation()
  const authPaths = ['/login', '/register']
  const isAuthPath = authPaths.includes(location.pathname)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!isAuthPath && <Header />}
      <main className={`flex-grow ${isAuthPath ? 'flex items-center justify-center' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mascotas" element={<Pets />} />
          <Route path="/citas" element={<Appointments />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
