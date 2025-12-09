import { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "../../redux/authReducer/authReducer.jsx";
import styles from "../../styles/pages/registerPage.module.css";

export function RegisterPage({ onSubmitHandler, loading }) {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const submitUserData = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    dispatch(registerUserAsync({ name, email, password }))
      .unwrap()
      .then(() => {
        toast.success("Signup successful!");
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Signup failed!");
      });
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={submitUserData}>
        <h2 className={styles.loginTitle}>Sign Up</h2>

        <input
          type="text"
          name="name"
          ref={nameRef}
          placeholder="Enter Name"
          className={styles.loginInput}
        />

        <input
          type="email"
          name="email"
          ref={emailRef}
          placeholder="Enter Email"
          className={styles.loginInput}
        />

        <input
          type="password"
          name="password"
          ref={passwordRef}
          placeholder="Enter Password"
          className={styles.loginInput}
        />

        <button className={styles.loginBtn} type="submit">
          {loading ? "..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
