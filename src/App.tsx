import Home from './pages/Home'
import StringArt from './pages/StringArt'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
import './styles/App.scss'

export default function App() {
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
