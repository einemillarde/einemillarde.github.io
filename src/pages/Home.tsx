import Tag from '../components/Tag'
import Tile from '../components/Tile'
import '../styles/pages/Home.scss'

export default function Home() {
    return (
        <main className='home'>
        <h1>Projects</h1>
        <div>
        <Tile
        src='https://github.com/user-attachments/assets/78dc619e-0c06-4c03-80a5-9bb4716eb1d0'
        title='Chess Game'
        href='/chess-game'
        desc='Chess game inspired by chess.com made in pygame.'
        tags={[
            <Tag name='python' color='#306998' />,
        ]}
        />
        </div>
        </main>
    )
}
