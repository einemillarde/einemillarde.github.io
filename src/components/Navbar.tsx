import '../styles/components/Navbar.scss'
import Logo from '../assets/gh-logo-white.svg';

export default function Navbar() {
    return (
        <nav className='navbar'>
        <a href='/' className='home-btn'>Home</a>
        <input type='text' placeholder='Search for projects here... (in progress)' />
            <a href='https://github.com/einemillarde/einemillarde.github.io' className='contribute' target='_blank'><img src={Logo} />Contribute</a>
            </nav>
    )
}
