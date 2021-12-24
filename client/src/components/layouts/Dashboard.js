import styles from "./Dashboard.module.css";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Dashboard(props) {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Dashboard;
