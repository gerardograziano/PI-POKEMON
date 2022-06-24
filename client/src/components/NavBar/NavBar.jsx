import { Link } from "react-router-dom";
import logo from "../../pictures/logo.png";
import pikachu from "../../pictures/navbar-pikachu.gif";
import pokemon from "../../pictures/pokemon.png";
import styles from "./NavBar.module.css";

export default function NavBar() {
    return (
        <div className={styles.nav_bar}>  
            <div className={styles.nav_conteiner}> 
                <div className={styles.nav_menu_izquierda}>
                    <Link to="/">
                        <img src={logo} className={styles.nav_bar_logo} alt="Pokemon App" />
                    </Link>
                    <div className={styles.menu} >
                        <ul>
                            <li>
                                <Link to="/pokemons">Home</Link>
                            </li>
                            <li>
                                <Link to="/create">Create</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
                <div className={styles.nav_menu_derecha}>
                    <img src={pikachu} className={styles.pikachu} alt="Pikachu" />
                    <img src={pokemon} className={styles.pokemon} alt="Pokémon" />
                </div>
            </div>
        </div>
    )
    
}