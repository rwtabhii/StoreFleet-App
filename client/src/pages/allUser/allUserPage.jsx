import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UserDetail } from "../../component/allUser/allUser.jsx";
import { Outlet } from "react-router-dom";

import styles from "../../styles/pages/allUserPage.module.css";
import { adminSelector, fetchAllUsers } from "../../redux/adminReducer/adminReducer.jsx";

export function AllUserPage() {
  const dispatch = useDispatch();
  const { allUsers, loading, error } = useSelector(adminSelector);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;
  if (error) {
    toast.error(error);
    return <p>Failed to load users.</p>;
  }

  return (
    <div className={styles.allUserPage}>
      <h2 className={styles.pageTitle}>All Registered Users</h2>
      <div className={styles.userList}>
        {allUsers.length > 0 ? (
          allUsers.map((user) => <UserDetail key={user._id} user={user} />)
        ) : (
          <p className={styles.noUserMsg}>No users found!</p>
        )}
      </div>
      <Outlet />
    </div>
  );
}
