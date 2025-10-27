import { Link } from "react-router-dom"
import './Navbar.scss'
import Logo from '../../assets/gh-logo-white.svg';

export default function Navbar() {
  return (
    <nav>
      <Link to='/' id='home-button'>Home</Link>
      <input type='text' id='search-bar' placeholder={'Search for projects here...'}></input>
      <a id='gh-repo-lnk' href='https://github.com/einemillarde/einemillarde.github.io'><img src={Logo} /></a>
    </nav>
  )
}