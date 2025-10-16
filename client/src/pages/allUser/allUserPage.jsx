import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UserDetail } from "../../component/allUser/allUser";

import "./AllUserPage.css";
import { adminSelector, fetchAllUsers } from "../../redux/adminReducer/adminReducer";
import { Outlet } from "react-router-dom";

export function AllUserPage() {
    const dispatch = useDispatch()
    const { allUsers, loading, error } = useSelector(adminSelector);
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    // Conditional rendering handles all states in one place
    if (loading) return <p>Loading users...</p>;
    if (error) {
        toast.error(error);
        return <p>Failed to load users.</p>;
    }

    return (
        <div className="all-user-page">
            <h2 className="page-title">All Registered Users</h2>
            <div className="user-list">
                {allUsers.length > 0 ? (
                    allUsers.map((user) => <UserDetail key={user._id} user={user} />)
                ) : (
                    <p className="no-user-msg">No users found!</p>
                )}
            </div>
            <Outlet />
        </div>
    );
}
