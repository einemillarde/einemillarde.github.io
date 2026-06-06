import Home from './pages/Home'
import Chess from './pages/Chess'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
import './styles/App.scss'

export default function App() {
    return (
        <>
        <Navbar />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chess-game' element={<Chess />} />
        </Routes>
        </>
    )
}
