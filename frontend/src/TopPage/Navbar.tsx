import './Navbar.css';

function Navbar() {
    return (
        <nav className="top-navbar">
            <a href="#" className="logo">Allina</a>
            <ul className="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Reset</a></li>
                <li><a href="#">History</a></li>
                <li><a href="#">Stats</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
