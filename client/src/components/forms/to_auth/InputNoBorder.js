import styles from "./InputNoBorder.module.css";
import InputMask from "react-input-mask";
import { FaEye, FaEyeslash } from "react-icons/fa";

function InputNoBorder({
  type,
  name,
  placeholder,
  labelImg,
  customId,
  mask,
  handleOnChange,
}) {
  return (
    <div className={styles.no_border_input}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={customId}
        mask={mask}
      />
      {labelImg}
      {type === "password" && <FaEye id={styles.eye} />}
    </div>
  );
}

export default InputNoBorder;
