import { useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetPasswordApi } from "../../api/users/users";

export function ResetPassword() {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const dispatch = useDispatch();

  // Grab the reset token from the URL
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      const payload = {
        token,
        password,
        confirmPassword
      };

      // console.log("Reset Password Payload:", payload);
      await resetPasswordApi(payload);
      toast.success("Password reset successfully!");
    }
    catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleResetPassword}>
        <h2 className="loginTitle">Reset Your Password</h2>

        {/* New Password Input */}
        <input
          type="password"
          name="password"
          ref={passwordRef}
          className="loginInput"
          placeholder="Enter New Password"
          required
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          name="confirmPassword"
          ref={confirmPasswordRef}
          className="loginInput"
          placeholder="Confirm New Password"
          required
        />

        {/* Submit Button */}
        <button type="submit" className="loginBtn">
          Reset Password
        </button>

        {/* Redirect to Login Page */}
        <NavLink to="/login" className="link">
          <p className="switchText">Back to Sign In</p>
        </NavLink>
      </form>
    </div >
  );
}
