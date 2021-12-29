import logo from "../../img/logo.svg";
import styles from "./Logo.module.css";

function Logo({ width, height, id, showBrand }) {
  return (
    <div id={id}>
      <img src={logo} width={width} height={height} className={styles.invert} />
      {showBrand && <span id={styles.brand}>aumiau</span>}
    </div>
  );
}

export default Logo;
