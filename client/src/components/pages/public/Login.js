import styles from "./login_and_register.module.css";
import FormLogin from "../../forms/to_auth/FormLogin";
import Logo from "../../layout/Logo";

function Login() {
  return (
    <div className={styles.login_register_container}>
      <FormLogin />
      <Logo id={styles.logo} width="50px" height="50px" showBrand={true} />
    </div>
  );
}

export default Login;
