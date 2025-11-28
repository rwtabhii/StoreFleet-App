import { NavLink, Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import appLogo from "../../assets/applogo.png";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, logout } from "../../redux/authReducer/authReducer";
import { fetchLoggedInUser } from "../../redux/authReducer/authReducer";
import { useEffect } from "react";

export function Navbar() {
    const navigate = useNavigate();
    const { login, userDetail } = useSelector(authSelector);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchLoggedInUser());
        console.log(userDetail)
    }, [dispatch]);

    const userLogout = () => {
        dispatch(logout(false));
    };

    return (
        <div className="navbar-container">
            {/* Left side (Logo) */}
            <div className="navbar-logo" onClick={() => navigate("/")}>
                <img src={appLogo} alt="logo" /> StoreFleet
            </div>

            {/* Right side (Links) */}
            <div className="navbar-links">
                {/* Always show Home */}
                <NavLink to="/" end className={({ isActive }) => (isActive ? "active-link" : "")}>
                    <i className="fa-solid fa-house"></i> Home
                </NavLink>

                {/* NOT logged in */}
                {!login && (
                    <NavLink to="/login" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In
                    </NavLink>
                )}

                {/* Logged in */}
                {login && userDetail?.user && (
                    <>
                        {/* User Links */}
                        {userDetail.user.role === "user" && (
                            <>
                                <NavLink to="/cart" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <i className="fa-solid fa-cart-shopping"></i> Cart
                                </NavLink>
                                <NavLink to="/order" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <i className="fa-solid fa-basket-shopping"></i> Order
                                </NavLink>
                            </>
                        )}

                        {/* Admin Links */}
                        {userDetail.user.role === "admin" && (
                            <>
                                <NavLink to="/all-orders" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <i className="fa-solid fa-list-check"></i> All Orders
                                </NavLink>
                                <NavLink to="/all-users" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <i className="fa-solid fa-users"></i> All Users
                                </NavLink>
                            </>
                        )}

                        {/* Common Dropdown for all logged-in users */}
                        <div className="dropdown userProfile">
                            <i className="fa-regular fa-circle-user dropbtn"></i>
                            <div className="dropdown-content">
                                <Link to="/dashboard">Profile</Link>
                                <Link to="/" onClick={userLogout}>Logout</Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
