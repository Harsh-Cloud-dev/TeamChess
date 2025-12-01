import Hamburger from "hamburger-react";
import { useState } from "react";
import './Navbar.css';
function Navbar() {
    const [isOpen,setOpen] = useState(false);
    return(
        <div>
            <nav className="Top-Navbar">
                <a href="#" className="logo">TeamChess</a>
                <ul>
                    <li>Home</li>
                    <li>Tournament</li>
                    <li>History</li>
                    <li>Stats</li>
                </ul>
                {/* {For Mobile} */}
                <div>
                <Hamburger 
                toggle={setOpen}
                toggled={isOpen}
                />
                {isOpen && <ul className="Nav-menu">
                    <li>Home</li>
                    <li>Tournament</li>
                    <li>History</li>
                    <li>Stats</li>
                </ul>
                }
                </div>
            </nav>
        </div>
    )
}
export default Navbar;