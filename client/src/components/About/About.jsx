import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./About.module.css";
import abaut from "../../pictures/abaut.webp";
import logo_react from "../../pictures/tecnologias/react.png";
import logo_redux from "../../pictures/tecnologias/redux.png";
import logo_express from "../../pictures/tecnologias/express.png";
import logo_sequelize from "../../pictures/tecnologias/sequelize.png";
import logo_postgres from "../../pictures/tecnologias/postgres.png";

class About extends React.Component {
    render() {
      return (
      <div >
          <NavBar />
          <div className={styles.container_about}>
            <div className={styles.conteiner}>
                <p className={styles.text_title}>APP POKEMON</p>
            </div>
            <div className={styles.conteiner_principal}>
                <div>
                    <img className={styles.image_principal} src={abaut} />
                </div>
                <div>
                    <p className={styles.text_cita}>"Algunos entrenadores no tienen miedo. Para ellos, este es solo un desafío más. Siguen sus corazones. Eso es lo que los distingue y los convertirá en Maestros Pokémon. Buena suerte a todos ustedes."
                    <br /><br />-Miranda.<br /><br />
                    <hr />
                    </p>            
                </div>
            </div>
            <div className={styles.conteiner}>
                <p className={styles.text}>Este Proyecto Individual, es la culminación, de lo aprendido durante el bootcam de Henry.
                <br /><br />Gerardo. </p>
            </div>
            <div className={styles.conteiner_tecnologias}>
                <img className={styles.image_tecnologias} src={logo_react} />
                <img className={styles.image_tecnologias} src={logo_redux} />
                <img className={styles.image_tecnologias} src={logo_express} />
                <img className={styles.image_tecnologias} src={logo_sequelize} />
                <img className={styles.image_tecnologias} src={logo_postgres} />
            </div>                
           
          </div>            
      </div> 
      )
    }
  }

export default About;
