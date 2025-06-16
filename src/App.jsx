import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/header/Header'
import { Home } from './views/Home'
import { Pets } from './views/Pets'
import { Appointments } from './views/Appointments'
import { Services } from './views/Services'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mascotas" element={<Pets />} />
            <Route path="/citas" element={<Appointments />} />
            <Route path="/servicios" element={<Services />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
