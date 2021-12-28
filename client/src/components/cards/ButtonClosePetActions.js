import styles from "./ButtonClosePetActions.module.css";

function ButtonClosePetActions({ name, handleOnClick }) {
  return (
    <span className={styles.ButtonClosePetActions} onClick={handleOnClick}>
      {name}
    </span>
  );
}

export default ButtonClosePetActions;
