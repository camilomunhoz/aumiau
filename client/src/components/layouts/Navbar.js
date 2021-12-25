import { Link } from "react-router-dom";
import Logo from "./Logo";
import styles from "./Navbar.module.css";
import { FaBars, FaDoorOpen } from "react-icons/fa";
import { useState } from "react";
import { unauthenticate } from "../../auth";

function Navbar() {
  const [menu, setMenu] = useState("unactive");
  const username = "Camilo";
  function toggleMenu() {
    menu === "active" ? setMenu("unactive") : setMenu("active");
  }

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
