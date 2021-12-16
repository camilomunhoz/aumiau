import styles from "./ButtonLoginAndRegister.module.css";

function ButtonLoginAndRegister({ text }) {
  return (
    <button type="button" id={styles.ButtonLoginAndRegister}>
      {text}
    </button>
  );
}

export default ButtonLoginAndRegister;
