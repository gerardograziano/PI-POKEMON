import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemons, getTypes, loadingPokemonsSet } from "../../store/actions";
import './LandingPage.css';

export default function LandingPage() {


    let dispatch = useDispatch();    

    useEffect(() => {
        dispatch(loadingPokemonsSet(true));
        dispatch(getPokemons());
        dispatch(getTypes());
        // eslint-disable-next-line
    }, []); 


    return(  
    
        <div className="landing">
                <div>
                    <span className='landing_title'>Pokemon App</span>
                    <span className='landing_text'>
                            discover the feactures of your favorite pokemons
                    </span>
                </div>
                <div>
                    <Link to="/pokemons">
                        <button className="waitAnimate">Enter</button>
                    </Link>
                </div>
        </div>    )
    
}