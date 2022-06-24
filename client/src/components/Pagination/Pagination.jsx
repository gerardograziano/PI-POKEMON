import { useSelector, useDispatch } from "react-redux";
import { topPage, bottomPage, modifyPage } from "../../store/actions";
import styles from "./Pagination.module.css";

export default function Pagination() {

    // --------------------- paginacion ---------------------------------
   
    const currentPage = useSelector((state) => state.currentPage);
    let dispatch = useDispatch();

    function onBackPage(e){
        dispatch(modifyPage(-1));
    }

    function onNextPage(e){
        dispatch(modifyPage(1));
    }
    

    function onTopPage(e){
        dispatch(topPage());
    }

    function onBottomPage(e){
        dispatch(bottomPage());
    }


    return (
        <div className={styles.container_pages}>
            <button className={styles.button_page} onClick={onBottomPage}>{"|<"}</button>
            <button className={styles.button_page} onClick={onBackPage}>{"<"}</button>
            <h3 className={styles.number_page}>{currentPage}</h3>
            <button className={styles.button_page} onClick={onNextPage}>{">"}</button>
            <button className={styles.button_page} onClick={onTopPage}>{">|"}</button>
        </div>
    );    
}