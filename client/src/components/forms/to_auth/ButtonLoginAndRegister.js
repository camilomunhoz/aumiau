import styles from "./ButtonLoginAndRegister.module.css";

function ButtonLoginAndRegister({ text, handleOnClick }) {
  return (
    <button type="button" id={styles.ButtonLoginAndRegister} onClick={handleOnClick}>
      {text}
    </button>
  );
}

export default ButtonLoginAndRegister;
