import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserAsync } from "../../redux/authReducer/authReducer";
import { authSelector } from "../../redux/authReducer/authReducer";
import "./loginForm.css"

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

  // ✅ dispatch returns a Promise-like action object
   dispatch(loginUserAsync({ email, password }))
  .unwrap() // converts thunk action into a real promise
  .then((user) => {
    toast.success("Login successful");
    navigate("/");
  })
  .catch((error) => {
    toast.error("Login failed");
  });
};



    return (
      <div className="formContainer">
        {/* Attach submit handler directly to form */}
        <form className="form" onSubmit={checkUserCred}>
          <h2 className="loginTitle">Sign In</h2>

          {/* Email Input */}
          <input
            type="email"
            name="email"
            ref={emailRef}
            className="loginInput"
            placeholder="Enter Email"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            ref={passwordRef}
            className="loginInput"
            placeholder="Enter Password"
            required
          />

          {/* Submit Button */}
          <button type="submit" className="loginBtn">
            {isLoading ? "..." : "Sign In"}
          </button>

          {/* Redirect to Register Page */}
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
