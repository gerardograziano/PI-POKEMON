import styles from "./Pokemon.module.css";

export default function Pokemon ({name, image, attack, types, id}) {
    
    return <div className={styles.card_container}>
                <div className={styles.card_container_title}>
                    <span className={styles.card_title}>{name}</span>
                </div>
                <div className={styles.card_container1}>
                    
                {image && <img className={styles.card_img} src={image} alt={name}/>     }      
                
                </div>
            
            <div className={styles.card_container_types}>
                    {types &&
                        types.map((type, index) => {
                            return <span className={styles.types_name} key={index}>{type.name}</span>
                        })
                    }
            </div>
            <div className={styles.card_container_types}>
                <span className={styles.text_attack} >Attack: {attack}</span>
            </div>
    </div>
}