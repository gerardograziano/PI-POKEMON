import OrderNone from "../OrderNone/OrderNone";
import OrderByName from "../OrderByName/OrderByName";
import OrderByAttack from "../OrderByAttack/OrderByAttack";
import Filters from "../Filters/Filters";
import "./OrderBar.css";

export default function OrderBar(){
    return (
        <div className="orderbar">
            <div >
                <OrderNone />    
            </div>
            <div >
                <OrderByName />    
            </div>
            <div >
                <OrderByAttack />
            </div>
            <div >
                <Filters />
            </div>
        </div>
    );
}
