import { Link } from "react-router-dom";
import Logo from "./Logo";
import styles from "./Navbar.module.css";
import { FaBars } from "react-icons/fa";

function Navbar() {
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
      <div className={styles.nav_right_items}>
        <FaBars id={styles.user_icon} />
      </div>
    </nav>
  );
}

export default Navbar;
