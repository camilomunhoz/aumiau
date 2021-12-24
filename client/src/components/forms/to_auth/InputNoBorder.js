import styles from "./InputNoBorder.module.css";
import { useState } from "react";

import InputMask from "react-input-mask";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputNoBorder({
  type,
  name,
  placeholder,
  labelImg,
  customId,
  mask,
  handleOnChange,
  value,
}) {
  const [pswdView, setPswdView] = useState(true);

  function togglePasswordView() {
    pswdView ? setPswdView(false) : setPswdView(true);
  }

  return (
    <div className={styles.no_border_input}>
      {mask ? (
        <InputMask
          name={name}
          placeholder={placeholder}
          mask={mask}
          onChange={handleOnChange}
          value={value}
        />
      ) : (
        <input
          type={type === "password" ? (pswdView ? "password" : "text") : type}
          name={name}
          placeholder={placeholder}
          id={customId}
          onChange={handleOnChange}
          value={value}
        />
      )}
      {labelImg}
      {type === "password" &&
        value &&
        (pswdView ? (
          <FaEye id={styles.eye} onClick={togglePasswordView} />
        ) : (
          <FaEyeSlash id={styles.eye} onClick={togglePasswordView} />
        ))}
    </div>
  );
}

export default InputNoBorder;
