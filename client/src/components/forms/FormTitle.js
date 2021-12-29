import styles from "./FormTitle.module.css";

function FormTitle({ title, handleOnClick }) {
  return (
    <span className={styles.form_title} onClick={handleOnClick}>
      {title}
    </span>
  );
}

export default FormTitle;
