import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./UserDashboard.css";
import { authSelector } from "../../redux/authReducer/authReducer";
import { updateUserData,updateUserPassword } from "../../api/users/users";


export function UserDashboard() {
  const { userDetail } = useSelector(authSelector);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // refs for profile form
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const profileImgRef = useRef(null);

  // refs for password form
  const oldPassRef = useRef(null);
  const newPassRef = useRef(null);
  const confirmPassRef = useRef(null);

  // Profile update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      profileImage: profileImgRef.current.files[0], 
    };

    try {
      await updateUserData(updatedData);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  // Password update
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const passwordData = {
      currentPassword: oldPassRef.current.value,
      newPassword: newPassRef.current.value,
      confirmPassword: confirmPassRef.current.value,
    };

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      await updateUserPassword(passwordData);
      toast.success("Password updated successfully!");
      setShowPasswordForm(false);
      oldPassRef.current.value = "";
      newPassRef.current.value = "";
      confirmPassRef.current.value = "";
    } catch (err) {
      console.error(err);
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>

      {/* Profile update form */}
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <div className="profile-preview">
          <img
            src={userDetail.user.profileImg || "/default-avatar.png"}
            alt="Profile"
            className="profile-img"
          />
        </div>

        <input type="file" name="profileImage" ref={profileImgRef} accept="image/*" />
        <input type="text" name="name" defaultValue={userDetail.user.name} ref={nameRef} />
        <input type="email" name="email" defaultValue={userDetail.user.email} ref={emailRef} />

        <button type="submit">Update Profile</button>
      </form>

      {/* Toggle password form */}
      {!showPasswordForm ? (
        <button className="toggle-password-btn" onClick={() => setShowPasswordForm(true)}>
          Change Password
        </button>
      ) : (
        <form className="dashboard-form password-form" onSubmit={handlePasswordSubmit}>
          <h3>Change Password</h3>
          <input type="password" placeholder="Current Password" ref={oldPassRef} required />
          <input type="password" placeholder="New Password" ref={newPassRef} required />
          <input type="password" placeholder="Confirm New Password" ref={confirmPassRef} required />

          <button type="submit">Update Password</button>
          <button type="button" className="cancel-btn" onClick={() => setShowPasswordForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
