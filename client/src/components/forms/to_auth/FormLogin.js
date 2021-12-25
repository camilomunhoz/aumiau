import styles from "./FormLoginAndRegister.module.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import isLogged, { authenticate } from "../../../auth";

import ButtonLoginAndRegister from "./ButtonLoginAndRegister";
import InputNoBorder from "../InputNoBorder";
import FormTitle from "../FormTitle";
import { FaEnvelope, FaKey } from "react-icons/fa";

function FormLogin() {
  const [login, setLogin] = useState([]);
  const [redirect, setRedirect] = useState(isLogged());

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
    // console.log(login);
  }

  function handleSubmit() {
    Axios.post("http://localhost:3001/login", login).then((response) => {
      if (!response.data.success) {
        console.log(response.data.errors);
      } else {
        authenticate(response.data.logged);
        setRedirect(true);
      }
    });
  }

  function handleBlur(e) {
    const value = e.target.value;
    if (value) {
      const field = e.target.name;
      if (field == "email") {
      }
    }
  }

  return (
    <form id={styles.form_login}>
      {redirect && <Navigate to="/" />}

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
      <ButtonLoginAndRegister text="Entrar" handleOnClick={handleSubmit} />

      <span className={styles.link}>
        <Link to="/register">
          Não possui cadastro? Clique aqui para se cadastrar.
        </Link>
      </span>
    </form>
  );
}

export default FormLogin;
