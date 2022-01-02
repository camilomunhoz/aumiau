import { Link } from "react-router-dom";
import Logo from "./Logo";
import styles from "./Navbar.module.css";
import { FaBars, FaDoorOpen } from "react-icons/fa";
import { useState, useEffect } from "react";
import Axios from "axios";
import { getAuthID, unauthenticate } from "../../auth";

function Navbar() {
  const [menu, setMenu] = useState("unactive");
  const [username, setUsername] = useState();
  function toggleMenu() {
    menu === "active" ? setMenu("unactive") : setMenu("active");
  }
  const useMountEffect = (func) => {
    useEffect(func, []);
  };

  // Executed on first render
  useMountEffect(() => {
    // Get auth username
    Axios.get("http://localhost:3001/get/username?id=" + getAuthID()).then(
      (response) => {
        const fullUsername = response.data[0].name;
        setUsername(fullUsername.replace(/ .*/, "")); // Gets the first word
      }
    );
  });

  return (
    <nav>
      <div className={styles.nav_left_items}>
        <Link id={styles.logo} to="/" className={styles.nav_link}>
          <Logo width={50} height={50} />
        </Link>
        <Link to="/" className={styles.nav_link}>
          Meus pets
        </Link>
        <Link to="/pets/add" className={styles.nav_link}>
          Adicionar pet
        </Link>
      </div>
      <div className={styles.nav_right_items} onClick={toggleMenu}>
        <FaBars id={styles.user_icon} />
      </div>
      {/* Menu lateral */}
      {
        <div
          id={styles.side_menu}
          className={menu === "active" ? styles.active_menu : null}
        >
          <ul>
            <li>{username}</li>
            <li className={styles.togglable_link}>
              <Link to="/">Meus pets</Link>
            </li>
            <li className={styles.togglable_link}>
              <Link to="/pets/add">Adicionar pet</Link>
            </li>

            <li
              id={styles.logout_btn}
              onClick={() => {
                unauthenticate();
              }}
            >
              <FaDoorOpen />
              Logout
            </li>
          </ul>
        </div>
      }
    </nav>
  );
}

export default Navbar;
