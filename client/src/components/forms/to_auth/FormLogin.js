import styles from "./FormLoginAndRegister.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

import ButtonLoginAndRegister from "./ButtonLoginAndRegister";
import InputNoBorder from "./InputNoBorder";
import FormTitle from "./FormTitle";
import { FaEnvelope, FaKey } from "react-icons/fa";

function FormLogin() {
  const [login, setLogin] = useState([]);

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
    // console.log(login);
  }

  return (
    <form className={styles.form_login}>
      <FormTitle title="ENTRAR" />
      <InputNoBorder
        type="text"
        name="email"
        placeholder="E-mail"
        labelImg={<FaEnvelope />}
        handleOnChange={handleChange}
      />
      <InputNoBorder
        type="password"
        name="password"
        placeholder="Senha"
        labelImg={<FaKey />}
        customId={styles.password_input}
        handleOnChange={handleChange}
        value={login.password ? login.password : ""}
      />
      <ButtonLoginAndRegister text="Entrar" />
      <span className={styles.link}>
        <Link to="/register">
          Não possui cadastro? Clique aqui para se cadastrar.
        </Link>
      </span>
    </form>
  );
}

export default FormLogin;
