import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/authReducer/authReducer.jsx";

export function ProtectRoute({ children }) {
    const { login } = useSelector(authSelector);

    if (login) {
        return children;
    }

    return <Navigate to="/" replace />;

}
