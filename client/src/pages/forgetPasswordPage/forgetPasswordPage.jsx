import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { forgetPasswordApi } from "../../api/users/users.js";
import styles from "../../styles/pages/loginForm.module.css";

export function ForgetPassword() {
  const emailRef = useRef();

  const forgetPassoword = async (e) => {
    try {
      e.preventDefault();
      const email = emailRef.current.value;
      await forgetPasswordApi(email);
      toast.success("Reset Mail Send Successfully")
      emailRef.current.value ="  "
    }
    catch(err){
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* Attach submit handler directly to form */}
      <form className={styles.form} onSubmit={forgetPassoword}>
        <h2 className={styles.loginTitle}>Forget Password</h2>

        {/* Email Input */}
        <input
          type="email"
          name="email"
          ref={emailRef}
          className={styles.loginInput}
          placeholder="Enter Email"
          required
        />

        {/* Submit Button */}
        <button type="submit" className={styles.loginBtn}>
          Forget Password
        </button>

        {/* Redirect to Register Page */}
        <NavLink to="/login" className={styles.link}>
          <p className={styles.switchText}>Or Sign In</p>
        </NavLink>
      </form>
    </div>
  );
}
