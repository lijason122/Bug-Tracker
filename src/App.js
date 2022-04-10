import Signup from "./components/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
        
      </Container>
    </AuthProvider>
  )
}

export default App;
