import styles from "./login_and_register.module.css";
import FormRegister from "../../forms/to_auth/FormRegister";
import Logo from "../../layout/Logo";

function Register() {
  return (
    <div className={styles.login_register_container}>
      <Logo id={styles.logo} width="50px" height="50px" showBrand={true} />
      <FormRegister />
    </div>
  );
}

export default Register;
