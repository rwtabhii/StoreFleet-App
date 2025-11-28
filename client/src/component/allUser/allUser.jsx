import { useState } from "react";
import "./allUser.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { adminSelector, removeUser, updateUserRole } from "../../redux/adminReducer/adminReducer";
import { useNavigate } from "react-router-dom";


export function UserDetail({ user }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(adminSelector);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    dispatch(removeUser(id))
    toast.success("User Delete Successfully");
  };

  const handleViewOrders = (id) => {
    navigate(`/user/${id}/orders`);
  };

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;

    try {
      // unwrap will convert the createAsyncThunk value in the form of promise so it can throw the error
      await dispatch(updateUserRole({ role : newRole, id: user._id })).unwrap();
      toast.success(`Role updated to ${newRole}`);
    } catch (err) {
      console.error( err); 
      toast.error(err || "Failed to update role");
    }
  };


  return (
    <div className="user-card">
      <div className="user-info">
        <h3 className="user-name">{user.name}</h3>
        <p><strong>Email:</strong> {user.email}</p>

        <div className="role-section">
          <strong>Role:</strong>
          <select
            value={user.role}
            onChange={handleRoleChange}
            disabled={loading}
            className="role-dropdown"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="user-actions">
        <button className="btn view-btn" onClick={() => handleViewOrders(user._id)}>
          View Orders
        </button>
        <button className="btn delete-btn" onClick={() => handleDelete(user._id)}>
          Delete User
        </button>
      </div>
    </div>
  );
}
