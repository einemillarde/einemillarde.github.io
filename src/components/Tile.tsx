import '../styles/components/Tile.scss'

interface TileProps {
  src: string,
  title: string,
  href: string,
  desc: string
}

export default function Tile(props: TileProps) {
  return (
    <a href={props.href} className='tile' style={{ backgroundImage: `url("${props.src}")` }}>
      <div className='title'>{props.title}</div>
      <div className='desc'>{props.desc}</div>
    </a>
  )
}