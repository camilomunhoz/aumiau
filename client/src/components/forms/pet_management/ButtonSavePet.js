import styles from "./ButtonSavePet.module.css";

function ButtonSavePet({ text, handleOnClick }) {
  return (
    <button type="button" id={styles.ButtonSavePet} onClick={handleOnClick}>
      {text}
    </button>
  );
}

export default ButtonSavePet;
