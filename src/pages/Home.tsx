import Tag from '../components/Tag'
import Tile from '../components/Tile'
import '../styles/pages/Home.scss'
import ChessImage from '../assets/Chess/game-img-1.png'
import RacingImage from '../assets/Racing Game/screenshot.png'

export default function Home() {
    return (
        <main className='home'>
        <h1>Projects</h1>
        <div>
        <Tile
        src={ChessImage}
        title='Chess Game'
        href='/chess-game'
        desc='Chess game inspired by chess.com made in pygame.'
        tags={[
            <Tag name='python' color='#306998' />,
        ]}
        />
        <Tile
        src={RacingImage}
        title='Racing Game'
        href='/racing-game'
        desc='Racing game with custom trained AI.'
        tags={[
            <Tag name='Godot' color='#478cbf' />,
        ]}
        />
        </div>
        </main>
    )
}
