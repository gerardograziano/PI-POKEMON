import {    GET_POKEMONS, GET_TYPES, FILTER_TYPE, FILTER_POKEMON, 
            SEARCH_POKEMON, GET_POKEMON_DETAILS, CREATE_POKEMON,
            MODIFY_PAGE, TOP_PAGE, BOTTOM_PAGE,
            SORT_NONE, SORT_NAME, SORT_ATTACK, 
            RESET_DETAILS, RESET_CREATED_POKEMON, RESET_SEARCH_POKEMON,
            ERROR_CREATED_POKEMON, ERROR_SEARCH_POKEMON, ERROR_GET_POKEMONS} from "../actions";
import { ASCENDENT, DESCENDENT } from "../../constants/sort";
import { ALL_TYPES, API_POKEMONS, DB_POKEMONS } from "../../constants/filter";

const initialState = {
    pokemons: [],
    filteredPokemons: [],
    pokemonFound: {},
    pokemonDetails: {},
    types: [],
    // -------------------------- filter and order --------------------------------
    filterTypes: false,
    filterPokemons: false,
    sortNone: true,
    sortAlfabetico:[false, false],
    sortAttack:[false, false],
    
    // ---------------------------- pagination -------------------------------------
    currentPage: 1,
    totalPokemons: 0,
    itemsByPage: 8,  // el valor pedido es 8

    // ---------------------------- create -----------------------------------------
    createdPokemon: false,

    // ---------------------------- error -------------------------------------------
    notFound: true,   // filtro o busqueda no encontrado
    searchingPokemon : false,
    error_msg: "",

}





export default function reducer(state = initialState, action){


    function filterAll (cType, cPokemon) 
    {   
        let backups = [...state.pokemons];
        
        // filtro por type de Pokemon
        if (cType && (cType !== ALL_TYPES)) {
                backups = backups.filter(pokemon => {
                    const extractTypes = pokemon.types.map(type => type.name);
                    return extractTypes.includes(cType);
                }); 
        };               

        // filtro Pokemon que viene desde la API
        if (cPokemon === API_POKEMONS){
            backups = backups.filter(pokemon => !isNaN(pokemon.id));  // valores numericos
        }

        // filtro Pokemon que viene desde la DB
        if (cPokemon === DB_POKEMONS){
            backups = backups.filter(pokemon => isNaN(pokemon.id));  // valores alfanumericos
        }

        return backups;
    };


   

    switch (action.type) {


        case RESET_CREATED_POKEMON:{
            return {
                ...state,
                createdPokemon: false,
                error_msg: '',
            }
        }


        case RESET_SEARCH_POKEMON:{
            return {
                ...state,
                notFound: true, 
                searchingPokemon : false,
            }
        }

        case ERROR_SEARCH_POKEMON:{
            return {
                ...state,
                notFound: true, 
                searchingPokemon : true,
            }
        }


        case ERROR_CREATED_POKEMON:{
            return {
                ...state,
                createdPokemon: false,
                error_msg: action.payload,
            }
        }
        

        case MODIFY_PAGE:{
            let valor = action.payload;
            if ((state.currentPage+valor) < 1) { valor = 0; };
            if ((state.currentPage+valor) > Math.ceil(state.totalPokemons/state.itemsByPage)) { valor = 0; };

            return {
                ...state,
                currentPage: state.currentPage + valor,
            }
        }


        case BOTTOM_PAGE:{
            return {
                ...state,
                currentPage: 1,
            }
        }

        case TOP_PAGE:{
            return {
                ...state,
                currentPage:  (state.totalPokemons === 0) ? 1 : Math.ceil(state.totalPokemons/state.itemsByPage),
            }
        }


        case CREATE_POKEMON:{
            let newPokemon = {
                id: action.payload.id,
                name: action.payload.name,
                image : action.payload.image,
                types: action.payload.types.map(type => {return{name: type.name}}),
            }

            return {
                ...state,
                pokemons: [...state.pokemons, newPokemon],
                filteredPokemons: [...state.filteredPokemons, newPokemon],
                totalPokemons: state.pokemons.length+1,
                createdPokemon: true,  // <------------
                error_msg: '',
            }
        }





        case GET_POKEMONS:{
            
            return {
                ...state,
                pokemons: action.payload,  // recibe un arreglo con todos los pokemons
                filteredPokemons: action.payload,
                pokemonDetails: {},
                pokemonFound: {},
                sortNone: true,
                filterTypes: false,
                filterPokemons: false,
                sortAlfabetico: [false, false],
                sortAttack: [false, false],
                currentPage: 1,
                totalPokemons: action.payload.length,
                notFound: (action.payload.length === 0),
            }
        }

        case SEARCH_POKEMON:{
            return {
                ...state,
                pokemonFound: action.payload,  // recibe el pokemon filtrado
                pokemonDetails: action.payload,
                notFound: false,
                searchPokemon: true,
            }
        }


        case GET_TYPES:{
            return {
                    ...state,
                    types: action.payload,  // recibe un arreglo con types
                };
            }

        
        case FILTER_TYPE:{
            let backups = filterAll(action.payload, state.filterPokemons);
            return {
                ...state,
                filteredPokemons: backups,
                filterTypes: action.payload,
                totalPokemons: backups.length,
                currentPage: 1,
                notFound: (backups.length === 0),
            }
        }



        case FILTER_POKEMON:{
            let backups = filterAll(state.filterTypes, action.payload);
            return {
                ...state,
                filterPokemons: action.payload,
                filteredPokemons: backups,
                totalPokemons: backups.length,
                currentPage: 1,
                notFound: (backups.length === 0),
            }
        }




        case SORT_NONE:{
            return {
                ...state,
                filteredPokemons: state.pokemons,
                sortNone: true,
                filterTypes: false,
                filterPokemons: false,
                sortAlfabetico: [false, false],
                sortAttack: [false, false],
                totalPokemons: state.pokemons.length,
                notFound: (state.filterPokemons.length === 0),
            }
         }        
        

        
        case SORT_NAME:{
            let orderPokemons = [...state.filteredPokemons];
            orderPokemons.sort((a, b) => {
                if (a.name < b.name) {  return action.payload === ASCENDENT ? -1 : 1; }
                if (a.name > b.name) {  return action.payload === DESCENDENT ? -1 : 1;}
                return 0;
            });

            return {
                ...state,
                filteredPokemons: orderPokemons,
                pokemonDetails: {},
                pokemonFound: {},
                sortAlfabetico: [action.payload === ASCENDENT, action.payload === DESCENDENT],
                sortAttack: [false, false],
                sortNone: false,
                notFound: (orderPokemons.length === 0),
            }
        } // Cierre del case SORT


        case SORT_ATTACK:{
            let orderPokemons = [...state.filteredPokemons];
            orderPokemons.sort((a, b) => {
                if (a.attack < b.attack) {  return action.payload === ASCENDENT ? -1 : 1; }
                if (a.attack > b.attack) {  return action.payload === DESCENDENT ? -1 : 1;}
                return 0;
            });

            return {
                ...state,
                filteredPokemons: orderPokemons,
                pokemonDetails: {},
                pokemonFound: {},
                sortAttack: [action.payload === ASCENDENT, action.payload === DESCENDENT],
                sortAlfabetico: [false, false],
                sortNone: false,
                notFound: (orderPokemons.length === 0),
            }
        } // Cierre del case ATTACK





        case RESET_DETAILS:{
            return {
                ...state,
                pokemonDetails: action.payload,
                pokemonFound: action.payload,
            }
        }

        case GET_POKEMON_DETAILS:{
            return {
                ...state,
                pokemonDetails: action.payload,  // recibe el pokemon filtrado

            }
        }
       

        default :  return state;
        
    };
}
