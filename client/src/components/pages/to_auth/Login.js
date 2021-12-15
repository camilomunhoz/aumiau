import styles from "./to_auth.module.css";
import FormLogin from "../../forms/to_auth/FormLogin";

function Login() {
  return (
    <div className={styles.login_register_background}>
      <FormLogin />
    </div>
  );
}

export default Login;
