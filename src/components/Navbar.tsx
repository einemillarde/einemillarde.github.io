import { Link } from "react-router-dom"
import '../styles/components/Navbar.scss'
import Logo from '../assets/gh-logo-white.svg';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <Link to='/' className='home-btn'>Home</Link>
      <input type='text' placeholder='Search for projects here... (in progress)' />
      <a href='https://github.com/einemillarde/einemillarde.github.io' className='contribute' target='_blank'><img src={Logo} />Contribute</a>
    </nav>
  )
}