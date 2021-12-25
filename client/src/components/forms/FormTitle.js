import styles from "./FormTitle.module.css";

function FormTitle({ title }) {
  return <span className={styles.form_title}>{title}</span>;
}

export default FormTitle;
