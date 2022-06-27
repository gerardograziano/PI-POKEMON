import { useSelector } from "react-redux";
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import OrderBar from '../OrderBar/OrderBar';
import Pokemons from '../Pokemons/Pokemons';
import styles from "./Home.module.css";



export default function Home() {

    const pokemons = useSelector((state) => state.filteredPokemons); 

    return (
    <div >
        <NavBar />
        
        <div >
            <div>
                <div >
                    <SearchBar/>
                </div>
                <div >
                    <OrderBar/>
                </div>
            </div>                
            
            <div className={styles.gallery_pokemon}>
                <Pokemons pks={pokemons} />  
            </div>
        </div>
     
    </div>
    );
}