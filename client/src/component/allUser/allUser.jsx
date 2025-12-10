import { useState } from "react";

import styles from "../../styles/component/allUser.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { adminSelector, removeUser, updateUserRole } from "../../redux/adminReducer/adminReducer.jsx";
import { useNavigate } from "react-router-dom";

export function UserDetail({ user }) {
  const dispatch = useDispatch();
  const { loading } = useSelector(adminSelector);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(removeUser(id));
    toast.success("User Delete Successfully");
  };

  const handleViewOrders = (id) => {
    navigate(`/user/${id}/orders`);
  };

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    try {
      await dispatch(updateUserRole({ role: newRole, id: user._id })).unwrap();
      toast.success(`Role updated to ${newRole}`);
    } catch (err) {
      toast.error(err || "Failed to update role");
    }
  };

  return (
    <div className={styles.userCard}>
      <div className={styles.userInfo}>
        <h3 className={styles.userName}>{user.name}</h3>
        <p><strong>Email:</strong> {user.email}</p>

        <div className={styles.roleSection}>
          <strong>Role:</strong>
          <select
            value={user.role}
            onChange={handleRoleChange}
            disabled={loading}
            className={styles.roleDropdown}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className={styles.userActions}>
        <button className={`${styles.btn} ${styles.viewBtn}`} onClick={() => handleViewOrders(user._id)}>
          View Orders
        </button>
        <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={() => handleDelete(user._id)}>
          Delete User
        </button>
      </div>
    </div>
  );
}
