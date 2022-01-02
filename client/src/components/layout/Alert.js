import styles from "./Alert.module.css";
import { FaTimes } from "react-icons/fa";

function Alert(props) {
  return (
    <div className={styles.Alert}>
      <div>
        {props.msg}
        <FaTimes className={styles.x} onClick={props.handleOnClose} />
      </div>
    </div>
  );
}

export default Alert;
