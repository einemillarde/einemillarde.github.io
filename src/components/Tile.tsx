import '../styles/components/Tile.scss'

interface Props {
    src: string,
    title: string,
    href: string,
    desc: string,
    tags: React.ReactNode[]
}

export default function Tile(props: Props) {
    return (
        <a href={props.href} className='tile'>
        <div className='image' style={{ backgroundImage: `url("${props.src}")` }}></div>
        <div className='title'>{props.title}</div>
        <div className='desc'>{props.desc}</div>
        <div className='tags'>{props.tags}</div>
        </a>
    )
}
