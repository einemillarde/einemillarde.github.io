import Home from './pages/home/Home.tsx'
import StringArt from './pages/string-art/StringArt.tsx'
import Navbar from './components/Navbar/Navbar.tsx'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/string-art' element={<StringArt />} />
    </Routes>
    </>
  )
}

export default App
