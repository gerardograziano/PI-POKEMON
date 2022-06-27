import { useDispatch, useSelector } from 'react-redux';
import { filterByType, filterByPokemon, resetSearchPokemon } from '../../store/actions';
import { ALL_POKEMONS, API_POKEMONS, DB_POKEMONS } from '../../constants/filter';
import styles from "./Filters.module.css";

export default function Filters() {  
    let types = useSelector(state => state.types);
    let filterTypes = useSelector(state => state.filterTypes);
    let filterPokemons = useSelector(state => state.filterPokemons);
    let dispatch = useDispatch();    

    
    function onChangeTypes(e){
        e.preventDefault();
        dispatch(resetSearchPokemon());
        dispatch(filterByType(e.target.value));
    }


    function onChangePokemon(e){
        e.preventDefault();
        dispatch(filterByPokemon(e.target.value));
    }


    return (
        
            <div className={styles.filter_container}>
                 <div className={styles.filter_item_title}><h3>FILTER</h3></div>
            
                <div >
                    <select className={styles.filter_select} value={filterTypes} onChange={onChangeTypes} >
                        <option value="allTypes">All Types</option>
                        {types.map(type => (
                            <option key={type.name} value={type.name}>{type.name}</option>
                        ))}
                    </select>

                </div>
                <div >
                    <select className={styles.filter_select} value={filterPokemons} onChange={onChangePokemon}>
                        <option value={ALL_POKEMONS} >All Pokémon</option>
                        <option value={API_POKEMONS} >API Pokémon</option>
                        <option value={DB_POKEMONS} >DB Pokémon</option>
                    </select>
                </div>
        </div>
        )
                
}
