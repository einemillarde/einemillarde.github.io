import '../styles/pages/RacingGame.scss'
import DownloadIcon from '../assets/download-icon.svg'
import Img1 from '../assets/Racing Game/screenshot.png'

export default function RacingGame() {
    return (
        <main className='racing-game'>
        <h1>Racing Game</h1>
        <img src={Img1} />
        <a href="https://github.com/einemillarde/racing-game/releases" className="download-btn" target="_blank">
            <img src={DownloadIcon}/>
            Download latest version from Github
        </a>
        <h2>Description</h2>
        This is a racing game made in Godot. It was made to train a racing neural network I am planning to make.
        Inspiration for this project came from <a href='https://www.youtube.com/watch?v=GGWHjAyKJCA' target='_blank'>this video</a>.
        </main>
    )
}
