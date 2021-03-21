import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header style={{marginTop: "16px", display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between"}}>
            <Link to="/"><div className="logo"></div></Link>
            <Navigation />
        </header>
    );
}

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/transfers">Active transfers</Link>
                </li>
                <li>
                    <Link className={styles.addTorrent} to="/add">Add torrent</Link>
                </li>
                <li>
                    <a href="https://github.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} size="lg" /></a>
                </li>
            </ul>
        </nav>
    )
}