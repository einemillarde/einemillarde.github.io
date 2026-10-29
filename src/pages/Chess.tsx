import '../styles/pages/Chess.scss';
import DownloadIcon from '../assets/download-icon.svg'
import Img1 from '../assets/Chess/game-img-1.png'
import Img2 from '../assets/Chess/game-img-2.png'
import Img3 from '../assets/Chess/game-img-3.png'

export default function Chess() {
    return (
        <main>
        <h1>Chess Game</h1>
        <div className="image-gallery">
            <img src={Img1} id="img1"/>
            <img src={Img2} id="img2"/>
            <img src={Img3} id="img3"/>
        </div>
        <a href="https://github.com/einemillarde/chess-in-pygame/releases" className="download-btn" target="_blank">
            <img src={DownloadIcon}/>
            Download latest version from Github
        </a>
        <h2>Description</h2>
        A very simple implementation of chess and all its rules in a pygame project. 
        It is also my first use of pygame. 
        This is as basic of a project as it gets, since it was made just to understand the rules of chess
        Unfortunately the development for this project has been dormant since I lost interest in chess but maybe I can get back to it and add some of the features I mentioned in my Github page.
        The project is entirely spaghetti code and bad design choices, so looking into the code isn't recommended.
        </main>
    )
}
