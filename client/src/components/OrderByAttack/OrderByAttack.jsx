import { useSelector, useDispatch } from "react-redux";
import { ASCENDENT, DESCENDENT } from "../../constants/sort";
import { sortAttack } from "../../store/actions";

export default function OrderByAttack() {

    let sort = useSelector((state) => state.sortAttack);
    const dispatch = useDispatch();

    function onClick(e) {
        let valor = e.target.value;
        dispatch(sortAttack(valor));
        e.target.className = "button-order-selected";
    }

    return (
        <div className="order-container">
            <div className="orderbar-item-title"><h3>By Attack</h3></div>
            <button className={sort[0] ? "button-order-selected":"button-order"} value={ASCENDENT} onClick={onClick}>- / +</button>
            <button className={sort[1] ? "button-order-selected":"button-order"} value={DESCENDENT} onClick={onClick}>+ / -</button>                       
        </div>
    )
 
}