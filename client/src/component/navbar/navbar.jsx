import { NavLink, Link, useNavigate } from "react-router-dom";
import styles from "../../styles/component/navbar.module.css";
import appLogo from "../../assets/applogo.png";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, logout, fetchLoggedInUser } from "../../redux/authReducer/authReducer.jsx";
import { logoutUser } from "../../api/users/users.js";
import { useEffect } from "react";

export function Navbar() {
    const navigate = useNavigate();
    const { login, userDetail } = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
    if (!login) {
        console.log("userdetails",userDetail)
      dispatch(fetchLoggedInUser());
    }
  }, []);

    const userLogout = async () => {
  try {
    // Call the backend API to clear the cookie
    const response = await logoutUser(); 
    // console.log(response.msg);
    dispatch(logout(false)); // or however your logout action is defined
  } catch (err) {
    console.error("Failed to logout:", err);
  }
};

    return (
        <div className={styles.navbarContainer}>
            {/* Logo */}
            <div className={styles.navbarLogo} onClick={() => navigate("/")}>
                <img src={appLogo} alt="logo" /> StoreFleet
            </div>

            {/* Links */}
            <div className={styles.navbarLinks}>

                {/* Home */}
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                >
                    <i className="fa-solid fa-house"></i> Home
                </NavLink>

                {/* If NOT logged in */}
                {!login && (
                    <NavLink
                        to="/login"
                        className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                    >
                        <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In
                    </NavLink>
                )}

                {/* If logged in */}
                {login && userDetail?.user && (
                    <>
                        {userDetail.user.role === "user" && (
                            <>
                                <NavLink
                                    to="/cart"
                                    className={({ isActive }) =>
                                        `${isActive ? styles.activeLink : styles.link} ${styles.navItemHideText}`
                                    }
                                >
                                    <i className="fa-solid fa-cart-shopping"></i> Cart
                                </NavLink>

                                <NavLink
                                    to="/order"
                                    className={({ isActive }) =>
                                        `${isActive ? styles.activeLink : styles.link} ${styles.navItemHideText}`
                                    }
                                >
                                    <i className="fa-solid fa-basket-shopping"></i> Order
                                </NavLink>

                            </>
                        )}

                        {userDetail.user.role === "admin" && (
                            <>
                                <NavLink
                                    to="/all-orders"
                                    className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                                >
                                    <i className="fa-solid fa-list-check"></i> All Orders
                                </NavLink>

                                <NavLink
                                    to="/all-users"
                                    className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                                >
                                    <i className="fa-solid fa-users"></i> All Users
                                </NavLink>
                            </>
                        )}

                        {/* Dropdown */}
                        <div className={`${styles.dropdown} ${styles.userProfile}`}>
                            <i className={`fa-regular fa-circle-user ${styles.dropbtn}`}></i>

                            <div className={styles.dropdownContent}>
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
