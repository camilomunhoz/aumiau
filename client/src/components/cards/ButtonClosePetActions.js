import styles from "./ButtonClosePetActions.module.css";

function ButtonClosePetActions({ name, handleOnClick }) {
  return (
    <span
      className={styles.ButtonClosePetActions}
      onClick={handleOnClick}
      title="Fechar ações"
    >
      {name}
    </span>
  );
}

export default ButtonClosePetActions;
