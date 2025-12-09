import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { loginUserAsync, authSelector } from "../../redux/authReducer/authReducer.jsx";
import styles from "../../styles/pages/loginForm.module.css";

export function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(authSelector);

  const checkUserCred = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    dispatch(loginUserAsync({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Login successful");
        navigate("/");
      })
      .catch(() => {
        toast.error("Login failed");
      });
  };

  const handleGoogleLogin = () => {
    console.log(import.meta.env.VITE_PROD_API_URL)
    window.location.href = `${import.meta.env.VITE_PROD_API_URL}/api/storefleet/user/auth/google`;
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={checkUserCred}>
        <h2 className={styles.loginTitle}>Sign In</h2>

        <input
          type="email"
          name="email"
          ref={emailRef}
          className={styles.loginInput}
          placeholder="Enter Email"
          required
        />

        <input
          type="password"
          name="password"
          ref={passwordRef}
          className={styles.loginInput}
          placeholder="Enter Password"
          required
        />

        <button type="submit" className={styles.loginBtn}>
          {isLoading ? "..." : "Sign In"}
        </button>

        <div className={styles.googleContainer}>
          <div className={styles.googleDivider}>
            <span className={styles.dividerLine}></span>
            <span className={styles.dividerText}>or</span>
            <span className={styles.dividerLine}></span>
          </div>

          <button type="button" className={styles.googleBtn} onClick={handleGoogleLogin}>
            <FcGoogle className={styles.googleLogo} />
            <span className={styles.googleText}>Sign in with Google</span>
          </button>
        </div>

        <NavLink to="/register" className={styles.link}>
          <p className={styles.switchText}>Or Sign Up instead</p>
        </NavLink>

        <NavLink to="/forget-password" className={styles.link}>
          <p className={styles.switchText}>Forget Password</p>
        </NavLink>
      </form>
    </div>
  );
}
