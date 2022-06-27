import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, resetCreatedPokemon } from '../../store/actions/';
import Pokemon from '../Pokemon/Pokemon';
import NavBar from "../NavBar/NavBar";
import styles from "./Create.module.css";
import stylesBar from "./RangeBar.module.css";
import { useEffect } from 'react';


const MAX_TYPES = 2;
const stringRegExp = /^[a-zA-Z]{1,20}$/;
const numberRegExp = /^([1-9][0-9]{0,2}|1000)$/;
//const urlRegExp = /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const urlRegExp = /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;


export function validate(input) {
  
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    } else if (!stringRegExp.test(input.username)) {
      errors.name = 'Name is invalid';
    }
  
    if(!input.image){
      errors.image = 'Image is required';
      } else if (!urlRegExp.test(input.image)){
      errors.image = 'Image URL invalid';
    }


    if(!input.height){
      errors.height = 'Height is required';
      } else if (!numberRegExp.test(input.height)){
      errors.height = 'Height invalid';
    }


    if(!input.weight){
      errors.weight = 'Weight is required';
      } else if (!numberRegExp.test(input.weight)){
      errors.weight = 'Weight invalid';
    }

    if(input.types.length <= 0){
      errors.types = 'Types is required';
    }

      
    return errors;
  };
  



export default function Create(){

    
    let types = useSelector(state => state.types);
    let createdPokemon = useSelector(state => state.createdPokemon); // <----------
    let error_msg = useSelector(state => state.error_msg);

    let dispatch = useDispatch();

    const inputStateInitial = {
      name: '',
      image: '',
      height: '',
      weight: '',
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      types: [],
    }

    const [input, setInput] = useState(inputStateInitial);
    
    const [errors, setErrors] = useState({
        name: '',
        image: '',
        height: '',
        weight: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        types:''
      });


      function handleInputChange (e) {
     
        if ((e.target.name === 'name')  && (e.target.value.length>1)){
          if (!stringRegExp.test(e.target.value) ) {
            return false;
          }
        }

        if ((e.target.name === 'height') || (e.target.name === 'weight')) {
           if (!numberRegExp.test(e.target.value) && e.target.value.length !== 0) {
              return false;
           }
        }

        
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
    
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }));
      
      }


      function onChangeRange(e) {

        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
    
      }


      function onChangeTypes(e) {

        // maximo de types 2
        if (e.target.value === "0") return;

          if (input.types.filter(type => (type.name === e.target.value)).length===0) {

            let newType = {"name": e.target.value};
            setInput({
              ...input,
              types: [...input.types, newType]
            });

            setErrors(validate({
              ...input,
              types: [...input.types, newType]
            }));

            
            if (input.types.length === MAX_TYPES-1) {
              e.target.disabled = true;
            }  
          
        }
        e.target.value = "0";
      }

      // delete Type de la lista
      function onClickDelete(e) {
          let newTypes = input.types.filter(type => type.name !== e.target.value);
          setInput({
                ...input,
                types: newTypes
              });       

          if (input.types.length < MAX_TYPES+1) {
            document.getElementById("typesSelect").disabled = false;
          }

          setErrors(validate({
            ...input,
            types: newTypes
          }));

      }



      function onClickCreate(e) {
        e.preventDefault();
        
        if (Object.keys(errors).length === 0) { 
              dispatch(createPokemon(input));
        } else {
          setErrors({
            ...errors
          })
        }
      }



    function inicializarForm(){           
        let selectTypes = document.getElementById("typesSelect");
        if (input.types.length<2) selectTypes.disabled = false;  
    }       

    function errorCreate(){
      let selectTypes = document.getElementById("typesSelect");
      let submitCreate = document.getElementById("submitCreate");
      if (input.types.length<2) selectTypes.disabled = false;
      submitCreate.disabled = false;                          
        
    }
      
   
    useEffect(() => {
      setInput(inputStateInitial);
      inicializarForm();
      setTimeout(()=>{dispatch(resetCreatedPokemon())},3000);
      // eslint-disable-next-line
    },[createdPokemon]);


    useEffect(() => {
      errorCreate();
      setTimeout(()=>{dispatch(resetCreatedPokemon())},3000);
      // eslint-disable-next-line
    },[error_msg]);


    return (
    <div>
        <NavBar />
        <div className={styles.conteiner_bar_state}>

              { 
                   createdPokemon &&
                    <div className={styles.text_bar_state}>
                       <span>POKEMON CREATED</span>
                    </div>                   
                    
                }                  

              
                {
                  (error_msg.length>0) && 
                      <div className={styles.text_error_form}>
                        <span className={styles.text_error_form}>{error_msg}</span>
                      </div>
                  }





                {    
                  // Errores de formulario
                  <div className={styles.text_error_form}>
                      {(Object.keys(errors).length !== 0) && 
                            "You must complete the form correctly before sending."   
                      }                  
                        
                  </div> 
                }   
             
        </div>
        <div className={styles.containerPrincipal}>
          

            <div className={styles.container}>
                
                {/* ------------- input NAME  */}
                <div className={styles.itemContainer}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>NAME:</label>
                      <input type="text" 
                              name="name" 
                              className={styles.input}
                              value={input.name} 
                              onChange={handleInputChange} placeholder="Pokémon Name"/>
                    </div> 
                    <div className={styles.errorrs}>
                        {errors.name && (<p className={styles.danger}>{errors.name}</p>  )}        
                    </div>
                </div>

                {/* ------------- input IMAGE  */}
                <div className={styles.itemContainer}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>IMAGE:</label>
                      <input type="text" 
                              name="image" 
                              className={styles.input}
                              value={input.image} onChange={handleInputChange} placeholder="Link to image..."/>
                    </div> 
                    <div className={styles.errors}>
                        {errors.image && (<p className={styles.danger}>{errors.image}</p>  )}        
                    </div>                   
                </div>

                {/* ------------- input heigth and weigth  */}
                <div className={styles.itemContainer}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>HEIGHT:</label>
                      <input type="text" 
                              name="height" 
                              className={styles.inputShort}
                              value={input.height} onChange={handleInputChange} placeholder="Height"/>
                    </div> 
                    <div className={styles.errors}>
                        <p className={styles.danger}>
                            {errors.height &&  errors.height   }
                        </p>
                    </div>                   
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>WEIGHT:</label>
                      <input type="text" 
                              name="weight" 
                              className={styles.inputShort}
                              value={input.weight} onChange={handleInputChange} placeholder="Weight"/>
                    </div> 
                    <div className={styles.errors}>
                        {errors.weight && (<p className={styles.danger}>{errors.weight}</p>  )}        
                    </div>                   
                </div>


                  {/* ------------- input TYPES   */}
                  <div className={styles.itemContainer}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>TYPES:</label>
                      
                      <select className={styles.types_select}  defaultValue="0" id="typesSelect"
                          onChange={onChangeTypes} name="types">
                          <option value="0">Select Types</option>
                          {types.map((type, index )=> (
                              <option key={index} value={type.name}>{type.name}</option>
                          ))}
                    </select>
                    
                    
                    </div> 
                    <div className={styles.inputGroupTypes}>
                            {input.types.map((type, index) => (
                               <div key={index}>
                                  <span className={styles.itemType}>{type.name}</span>
                                  <button className={styles.button_delete} value={type.name} onClick={onClickDelete}>X</button>
                               </div>
                              ))}
                    </div>               
                </div>
                <div className={styles.containerErrorTypes}>
                  <div className={styles.typesNote}>
                    2 types maximum
                  </div>
                  <div className={styles.typesError}>
                          {errors.types && errors.types}        
                  </div> 
                </div>


                {/* ------------- input RANGE INPUT  */}
                <div className={styles.itemContainerRange}>
                  <form className={stylesBar.rangeForm}>
                    <div className={stylesBar.rangeGroup}>
                        <span className={stylesBar.labelRange}>HP</span>
                        <input type="range" defaultValue={input.hp} name="hp" onChange={onChangeRange} 
                              min={0} max={999} value={input.hp} />
                        <span className={stylesBar.labelRangeNumber}>{input.hp}</span>
                    </div>
                    <div className={stylesBar.rangeGroup}>
                        <span className={stylesBar.labelRange}>ATTACK</span>
                        <input type="range" defaultValue={input.attack} name="attack" onChange={onChangeRange}
                              min={0} max={999} value={input.attack}/>
                        <span className={stylesBar.labelRangeNumber}>{input.attack}</span>
                    </div>
                    <div className={stylesBar.rangeGroup}>
                        <span className={stylesBar.labelRange}>DEFENSE</span>
                        <input type="range" defaultValue={input.defense} name="defense" onChange={onChangeRange}
                              min={0} max={999} value={input.defense} />
                        <span className={stylesBar.labelRangeNumber}>{input.defense}</span>
                    </div>
                    <div className={stylesBar.rangeGroup}>
                        <span className={stylesBar.labelRange}>SPEED</span>
                        <input type="range" defaultValue={input.speed}  name="speed" onChange={onChangeRange}
                              min={0} max={999} value={input.speed} />
                        <span className={stylesBar.labelRangeNumber}>{input.speed}</span>
                    </div>
                  </form>
                </div>


                <div className={styles.itemContainer_create}> 
                    <input className={styles.button_create} onClick={onClickCreate}
                           type="submit" name="submit" value="CREATE" id="submitCreate" />
                </div>
                
            </div>
            <div>
            <div className={styles.containerPreview}>
                <span className={styles.title}>CARD PREVIEW</span>
                <div className={styles.containerPreview_Card} >
                    <Pokemon name={input.name} image={input.image} height={input.height} weight={input.weight} hp={input.hp} attack={input.attack} defense={input.defense} speed={input.speed} types={input.types} />
                </div>
            </div>
            
            </div>      
            
        </div>
       
      </div>
    
    );
    
}