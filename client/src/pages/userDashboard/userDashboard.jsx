import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "../../styles/pages/userDashboard.module.css";
import { authSelector } from "../../redux/authReducer/authReducer.jsx";
import { updateUserData, updateUserPassword } from "../../api/users/users.js";

export function UserDashboard() {
  const { userDetail } = useSelector(authSelector);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const profileImgRef = useRef(null);

  const oldPassRef = useRef(null);
  const newPassRef = useRef(null);
  const confirmPassRef = useRef(null);

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
    <div className={styles.dashboardContainer}>
      <h2>User Dashboard</h2>

      <form className={styles.dashboardForm} onSubmit={handleSubmit}>
        <div className={styles.profilePreview}>
          <img
            src={userDetail.user.profileImg || "/default-avatar.png"}
            alt="Profile"
            className={styles.profileImg}
          />
        </div>

        <input
          type="file"
          name="profileImage"
          ref={profileImgRef}
          accept="image/*"
        />
        <input
          type="text"
          name="name"
          defaultValue={userDetail.user.name}
          ref={nameRef}
        />
        <input
          type="email"
          name="email"
          defaultValue={userDetail.user.email}
          ref={emailRef}
        />

        <button type="submit">Update Profile</button>
      </form>

      {!showPasswordForm ? (
        <button
          className={styles.togglePasswordBtn}
          onClick={() => setShowPasswordForm(true)}
        >
          Change Password
        </button>
      ) : (
        <form
          className={`${styles.dashboardForm} ${styles.passwordForm}`}
          onSubmit={handlePasswordSubmit}
        >
          <h3>Change Password</h3>
          <input
            type="password"
            placeholder="Current Password"
            ref={oldPassRef}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            ref={newPassRef}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            ref={confirmPassRef}
            required
          />

          <button type="submit">Update Password</button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => setShowPasswordForm(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
