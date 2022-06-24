import React from "react";
import { useParams } from "react-router";
import { useDispatch , useSelector } from "react-redux";
import { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Pokemon from "../Pokemon/Pokemon";
import { getPokemonById } from "../../store/actions";
import styles from "./Details.module.css";
import "./bars.css";
import pictureAsh from "../../pictures/ash.png";
import loading from "../../pictures/Pikachu_Caminando.gif";
import { MAX_STATS } from "../../constants/stats"; // maximo varlos de las stats


export default function Details(){

    const {id} = useParams();
    const dispatch = useDispatch();
    const pokemonDetails = useSelector(state => state.pokemonDetails);
    

    // useEffect(() => {
    //     if (Object.entries(pokemonDetails).length === 0) dispatch(getPokemonById(id));
    // }, [pokemonDetails]);

    useEffect(() => {
        dispatch(getPokemonById(id));
    }, [id]);

    
    let barraHP = null;
    let barraAttack = null;
    let barraDefense = null;
    let barraSpeed = null;
    
    if (pokemonDetails.name) {
        
        let porcentajeHP = (pokemonDetails.hp / MAX_STATS) * 100;
        let porcentajeAttack = (pokemonDetails.attack / MAX_STATS) * 100;
        let porcentajeDefense = (pokemonDetails.defense / MAX_STATS) * 100;
        let porcentajeSpeed = (pokemonDetails.speed / MAX_STATS) * 100;
        
        barraHP = React.CSSProperties = {"--bar-value": porcentajeHP.toString() + '%'};
        barraAttack = React.CSSProperties = {"--bar-value": porcentajeAttack.toString() + '%'};
        barraDefense = React.CSSProperties = {"--bar-value": porcentajeDefense.toString() + '%'};
        barraSpeed = React.CSSProperties = {"--bar-value": porcentajeSpeed.toString() + '%'};
            
     }


    return (

    <div >
        <NavBar/>

        {pokemonDetails.name ?    // verificacion de que el pokemon este cargado para mostrarlo
            
            
            <div className={styles.container}>
                <div className={styles.details_container_title}>
                    <h1 className={styles.details_title}>POKÉMON DETAILS</h1>  
                </div>

                <div className={styles.container_details}> 
                    <div > 
                        <div >
                            <img className={styles.details_image} src={pictureAsh} alt="Ash" />
                        </div>
                    </div>

                    <div className={styles.details_info}>

                        <Pokemon id={pokemonDetails.id}
                                name={pokemonDetails.name}
                                image={pokemonDetails.image}
                                types={pokemonDetails.types} key={pokemonDetails.id} />

                    </div>
                    <div className={styles.details_stats}>
                        <div className={styles.details_info_types}>
                        <span className={styles.stats_title}>Measures</span>
                            <ul className={styles.ul}>
                                <li className={styles.stats_item}>Height: {pokemonDetails.height}</li>
                                <li className={styles.stats_item}>Weight: {pokemonDetails.weight}</li>
                            </ul>
                        </div>
                        <div className={styles.details_stats}>
                            <span className={styles.stats_title}>Stats</span>
                            <div className="chart-wrap">
                                <div className="grid">
                                    <div className="bar" style={barraHP} 
                                            data-name={"HP("+pokemonDetails.hp+")"} title="HP"></div>
                                    <div className="bar" style={barraAttack} 
                                            data-name={"Attack("+pokemonDetails.attack+")"} title="Attack"></div>
                                    <div className="bar" style={barraDefense} 
                                            data-name={"Defense("+pokemonDetails.defense+")"} title="Defense"></div>
                                    <div className="bar" style={barraSpeed} 
                                            data-name={"Speed("+pokemonDetails.speed+")"} title="Speed"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :   <div className={styles.container_loading}>
                    <img src={loading} />
                    Loading...
                </div>
            } 
        </div>
    );

}

