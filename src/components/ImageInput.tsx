import '../styles/components/ImageInput.scss'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Navbar(props: Props) {
  return (
    <>
      <input type="file" accept="image/*" onChange={props.onChange}/>
    </>
  )
}