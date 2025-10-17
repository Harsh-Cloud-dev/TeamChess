import { Squash as Hamburger } from 'hamburger-react'
import {useState} from 'react'
import './Navbar.css'
function Navbar(){
  const [isOpen,setOpen] = useState(false)
  console.log(isOpen);
  return(
    <>
    <nav className='navbar'>
      <h1 className='logo'>TeamChess</h1>
      <div className='hamburger'>
      <Hamburger 
      toggle={setOpen}
      toggled={isOpen}
      />
      </div>
        <ul className={`nav-links ${isOpen ? 'open':''}`}>
          <li>Home</li>
          <li>Tounament</li>
          <li>Community</li>
          <li>History</li>
        </ul>
    </nav>
    </>
  )
}
export default Navbar;