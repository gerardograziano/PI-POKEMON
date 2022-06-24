import styles from "./Pokemon.module.css";

export default function Pokemon ({name, image, types, id}) {
    
    return <div className={styles.card_container}>
                <div className={styles.card_container_title}>
                    <span className={styles.card_title}>{name}</span>
                </div>
                <div className={styles.card_container1}>
                    
                {image && <img className={styles.card_img} src={image} alt={name}/>     }      
                
                </div>
            
            <div className={styles.card_container_types}>
                    {
                        types.map((type) => {
                            return <span className={styles.types_name} key={type.name}>{type.name}</span>
                        })
                    }
            </div>
    </div>
}