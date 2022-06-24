import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemons, getTypes, resetDetails } from "../../store/actions";
import './LandingPage.css';

export default function LandingPage() {


    let dispatch = useDispatch();    

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
        dispatch(resetDetails());
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