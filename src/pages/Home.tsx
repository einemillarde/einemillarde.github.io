import Tile from '../components/Tile'
import '../styles/pages/Home.scss'

export default function Home() {
  return (
    <main className='home'>
    <h1>Projects</h1>
    <div>
      <Tile
        src='https://www.mirion.com/assets/usradiumgirls-argonne1ca1922-23-150dpi_YBjJ4rv.jpg'
        title='String Art Generator'
        href='/string-art'
        desc='Generates realistic pictures using a circular canvar, nails, and a single thread. Currently in progress'
      />
    </div>
    </main>
  )
}