import styles from "./FormTitle.module.css";

function FormTitle({ title }) {
  return <span className={styles.auth_form_title}>{title}</span>;
}

export default FormTitle;
