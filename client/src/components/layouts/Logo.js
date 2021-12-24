import logo from "../../img/logo.svg";
import styles from "./Logo.module.css";

function Logo({ width, height }) {
  return (
    <img src={logo} width={width} height={height} className={styles.invert} />
  );
}

export default Logo;
