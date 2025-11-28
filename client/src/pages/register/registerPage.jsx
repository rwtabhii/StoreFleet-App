import { useRef } from "react";
import { toast } from "react-toastify";
import "./registerPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "../../redux/authReducer/authReducer";

export function RegisterPage({ onSubmitHandler, loading }) {
  // Refs for form input fields (avoids controlled components boilerplate)
  const dispatch = useDispatch()
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  // React Router hook for navigation
  const navigate = useNavigate();

  // ✅ Handle user registration
  const submitUserData = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Collect input values from refs
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // API call → register user
   dispatch( registerUserAsync({ name, email, password }))
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
    <div className="formContainer">
      {/* ✅ Attach form submit handler */}
      <form className="form" onSubmit={submitUserData}>
        <h2 className="loginTitle">Sign Up</h2>

        {/* Input → Name */}
        <input
          type="text"
          name="name"
          ref={nameRef}
          placeholder="Enter Name"
          className="loginInput"
        />

        {/* Input → Email */}
        <input
          type="email"
          name="email"
          ref={emailRef}
          placeholder="Enter Email"
          className="loginInput"
        />

        {/* Input → Password */}
        <input
          type="password"
          name="password"
          ref={passwordRef}
          placeholder="Enter Password"
          className="loginInput"
        />

        {/* Submit button (shows loader state if loading) */}
        <button className="loginBtn" type="submit" >
          {loading ? "..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
