import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { loginUserAsync, authSelector } from "../../redux/authReducer/authReducer";
import "./loginForm.css";

export function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(authSelector);

  // 🟢 Normal login handler
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

  // 🔵 Passport.js Google login redirect
  const handleGoogleLogin = () => {
    // Simply redirect the user to backend Google OAuth route
    window.location.href = "http://localhost:3000/api/storefleet/user/auth/google";
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={checkUserCred}>
        <h2 className="loginTitle">Sign In</h2>

        <input
          type="email"
          name="email"
          ref={emailRef}
          className="loginInput"
          placeholder="Enter Email"
          required
        />

        <input
          type="password"
          name="password"
          ref={passwordRef}
          className="loginInput"
          placeholder="Enter Password"
          required
        />
        <button type="submit" className="loginBtn">
          {isLoading ? "..." : "Sign In"}
        </button>

        {/* Google Login Section */}
        <div className="googleContainer">
          <div className="googleDivider">
            <span className="dividerLine"></span>
            <span className="dividerText">or</span>
            <span className="dividerLine"></span>
          </div>

          <button
            type="button"
            className="googleBtn"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="googleLogo" />
            <span className="googleText">Sign in with Google</span>
          </button>
        </div>


        <NavLink to="/register" className="link">
          <p className="switchText">Or Sign Up instead</p>
        </NavLink>
        <NavLink to="/forget-password" className="link">
          <p className="switchText">Forget Password</p>
        </NavLink>
      </form>
    </div>
  );
}
