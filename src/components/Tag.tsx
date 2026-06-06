import '../styles/components/Tag.scss'

interface Props {
    name: string,
    color: string,
}

export default function Tag(props: Props) {
    return (
        <div className='tag' style={{ color: props.color, borderColor: props.color }}>{props.name}</div>
    )
}
