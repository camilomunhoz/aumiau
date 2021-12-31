import styles from "./InputNoBorder.module.css";
import { useState } from "react";

import InputMask from "react-input-mask";
import {
  FaEye,
  FaEyeSlash,
  FaQuestionCircle,
  FaExclamationCircle,
} from "react-icons/fa";

function InputNoBorder({
  type,
  name,
  placeholder,
  labelImg,
  customId,
  mask,
  info,
  handleOnChange,
  handleOnBlur,
  value,
}) {
  const [pswdView, setPswdView] = useState(true);
  const [infoView, setInfoView] = useState(false);

  function togglePasswordView() {
    pswdView ? setPswdView(false) : setPswdView(true);
  }
  function toggleInfoView() {
    infoView ? setInfoView(false) : setInfoView(true);
  }

  return (
    <div className={styles.no_border_input}>
      {/* Insert input with mask or not */}
      {mask ? (
        <InputMask
          name={name}
          placeholder={placeholder}
          mask={mask}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          value={value}
        />
      ) : (
        <input
          type={type === "password" ? (pswdView ? "password" : "text") : type}
          name={name}
          placeholder={placeholder}
          id={customId}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          value={value}
        />
      )}
      {/* Insert label image */}
      {labelImg}
      {/* Insert logic to peek on the password */}
      {type === "password" &&
        value &&
        (pswdView ? (
          <FaEye id={styles.eye} onClick={togglePasswordView} />
        ) : (
          <FaEyeSlash id={styles.eye} onClick={togglePasswordView} />
        ))}
      {/* Insert input info */}
      {info && (
        <>
          <div
            className={styles.info_handle}
            onClick={toggleInfoView}
            title={infoView ? "Fechar aviso" : "Abrir aviso"}
          >
            {type === "password" ? (
              <FaQuestionCircle />
            ) : (
              <FaExclamationCircle />
            )}
          </div>
          <div className={`${styles.info_input} ${infoView && styles.showing}`}>
            <span>{info}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default InputNoBorder;
