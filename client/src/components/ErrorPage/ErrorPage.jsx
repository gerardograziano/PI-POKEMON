import NavBar from "../NavBar/NavBar";
import styles from "./ErrorPage.module.css";
import paginaNotFound from "../../pictures/pagina_not_found.png";


export default function ErrorPage() {

   return (
        <div>
                <div>
                    <NavBar />
                </div>
                <div className={styles.container}>
                    <img className={styles.image} src={paginaNotFound} alt="Error Page not Found" />
                    <h1 className={styles.text_404}>error 404</h1>
                    <h2 className={styles.text_error}>Page not found.</h2>
                </div>
        </div>
    );
}