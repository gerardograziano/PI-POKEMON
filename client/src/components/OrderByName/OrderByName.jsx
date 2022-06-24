import { useSelector, useDispatch } from "react-redux";
import { ASCENDENT, DESCENDENT } from "../../constants/sort";
import { sortName } from "../../store/actions";


export default function OrderByName() {

    let sort = useSelector((state) => state.sortAlfabetico);
    const dispatch = useDispatch();

    function onClick(e) {
        e.preventDefault();
        let valor = e.target.value;
        dispatch(sortName(valor));
        e.target.className = "button-order-selected";
    }

    return (
        <div className="order-container">
            <div className="orderbar-item-title"><h3>By Name</h3></div>
            <button className={sort[0] ? "button-order-selected":"button-order"} value={ASCENDENT} onClick={onClick}>A-Z</button>
            <button className={sort[1] ? "button-order-selected":"button-order"} value={DESCENDENT} onClick={onClick}>Z-A</button>                       
        </div>
    )
 
}