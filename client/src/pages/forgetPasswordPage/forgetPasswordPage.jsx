

import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgetPasswordApi } from "../../api/users/users";


export function ForgetPassword() {
  const emailRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="formContainer">
      {/* Attach submit handler directly to form */}
      <form className="form" onSubmit={forgetPassoword}>
        <h2 className="loginTitle">Forget Password</h2>

        {/* Email Input */}
        <input
          type="email"
          name="email"
          ref={emailRef}
          className="loginInput"
          placeholder="Enter Email"
          required
        />

        {/* Submit Button */}
        <button type="submit" className="loginBtn">
          Forget Password
        </button>

        {/* Redirect to Register Page */}
        <NavLink to="/login" className="link">
          <p className="switchText">Or Sign In</p>
        </NavLink>
      </form>
    </div>
  );
}
