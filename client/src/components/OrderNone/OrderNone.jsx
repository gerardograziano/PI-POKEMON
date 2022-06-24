import { useDispatch } from "react-redux";
import { NONE } from "../../constants/sort";
import { sortNone } from "../../store/actions";


export default function OrderNone() {

    const dispatch = useDispatch();

    function onClick(e) {
        e.preventDefault();
        dispatch(sortNone());
       
    }

    return (
        <div className="order-container">
            <button className={"button-order"} 
                    value={NONE} onClick={onClick}>RESET</button>
        </div>

    );
}