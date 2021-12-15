import styles from "./to_auth.module.css";
import FormRegister from "../../forms/to_auth/FormRegister";

function Register() {
  return (
    <div className={styles.login_register_background}>
      <FormRegister />
    </div>
  );
}

export default Register;
