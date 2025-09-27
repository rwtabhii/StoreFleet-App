import { useNavigate } from "react-router-dom";
import { authSelector } from "../../redux/authReducer/authReducer";
import { useSelector } from "react-redux";


export function ProtectRoute({ children }) {
    const{login} = useSelector(authSelector)
    const navigate = useNavigate()
    if (!login){
        return navigate("/")
    }
        return children;
}  