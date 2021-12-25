import styles from "./InputBasic.module.css";
import { useState } from "react";

import InputMask from "react-input-mask";

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
  return (
    <div className={styles.basic_input}>
      {labelImg}
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
          type={type}
          name={name}
          placeholder={placeholder}
          id={customId}
          onChange={handleOnChange}
          value={value}
        />
      )}
    </div>
  );
}

export default InputNoBorder;
