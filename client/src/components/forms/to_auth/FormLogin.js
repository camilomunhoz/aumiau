import styles from "./FormLoginAndRegister.module.css";
import { Link } from "react-router-dom";

import InputNoBorder from "./InputNoBorder";
import FormTitle from "./FormTitle";
import { FaEnvelope, FaKey } from "react-icons/fa";

function FormLogin() {
  return (
    <form className={styles.form_login}>
      <FormTitle title="ENTRAR" />
      <InputNoBorder
        type="text"
        name="email"
        placeholder="E-mail"
        labelImg={<FaEnvelope />}
      />
      <InputNoBorder
        type="password"
        name="password"
        placeholder="Senha"
        labelImg={<FaKey />}
        customId={styles.password_input}
      />
      <span className={styles.link}>
        <Link to="/register">
          Não possui cadastro? Clique aqui para se cadastrar.
        </Link>
      </span>
    </form>
  );
}

export default FormLogin;
