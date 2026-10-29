import Home from './pages/Home'
import Chess from './pages/Chess'
import RacingGame from './pages/RacingGame'
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
        <Route path='/racing-game' element={<RacingGame />} />
        </Routes>
        </>
    )
}
