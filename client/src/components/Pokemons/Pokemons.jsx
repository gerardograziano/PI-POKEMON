import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Pokemon from "../Pokemon/Pokemon";
import styles from "./Pokemons.module.css";
import imgLoading from "../../pictures/Pikachu_Caminando.gif";
import pokeball_not_found from "../../pictures/pokeball_not_found.gif";

export default function Pokemons({pks}){

    let currentPage = parseInt(useSelector((state) => state.currentPage));
    let totalPokemons = parseInt(useSelector((state) => state.totalPokemons));
    let itemsByPage = parseInt(useSelector((state) => state.itemsByPage));

    let notFound = useSelector((state) => state.notFound);
    let notFoundSearch = useSelector((state) => state.notFoundSearch);
    let loadingPokemons = useSelector((state) => state.loadingPokemons);
    let searchingPokemon = useSelector((state) => state.searchingPokemon);
 

    let start = (currentPage - 1) * itemsByPage;
    let end = start + itemsByPage;
    if (end > totalPokemons) end = totalPokemons;
    if (start < 0) start = 0;
    
 
    return <div className={styles.container_cards}>
                 
        {
            ((((pks.length === 0) && notFound && !loadingPokemons ) 
                || (searchingPokemon && !loadingPokemons && notFound) 
                || ((pks.length === 0) && searchingPokemon && loadingPokemons && notFound) // condicion para filtro
                || ( notFoundSearch  && searchingPokemon) // condicion para search not found
                
            ) ?
                    <div className={styles.container_not_found}>
                        <img src={pokeball_not_found} className={styles.img_not_found} alt="pokemon not found" />
                        <h4 className={styles.text_not_found}>No se encontraron resultados.</h4>
                    </div>                       
                :

                (loadingPokemons && !searchingPokemon)  ?         
                        (<div className={styles.container_loading}>
                            <img src={imgLoading} className={styles.img_loading} alt="loading" />
                            <h4 className={styles.text_loading}>Pokemons loading...</h4>
                        </div>)
                
                :
                pks.map((pokemon) => {
                    return (
                        <Link to={`/pokemons/${pokemon.id}`} key={pokemon.id}>
                            <Pokemon id={pokemon.id}
                                name={pokemon.name}
                                image={pokemon.image}
                                attack={pokemon.attack}
                                types={pokemon.types} key={pokemon.id} />
                        </Link>
                    ) // return.map
                }).slice(start, end)
            ) 
        }                    
          
        

    </div>
} 
