import styles from "./FormLoginAndRegister.module.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import isLogged, { authenticate } from "../../../auth";
import validate from "../../../validations";

import ButtonLoginAndRegister from "./ButtonLoginAndRegister";
import InputNoBorder from "../InputNoBorder";
import FormTitle from "../FormTitle";
import { FaEnvelope, FaKey } from "react-icons/fa";

function FormLogin() {
  const [login, setLogin] = useState([]);
  const [redirect, setRedirect] = useState(isLogged());
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  function lookAtMe(name) {
    const target = document.querySelector(`input[name="${name}"]`);
    if (!target.classList.length) {
      target.classList.add(styles.look_at_me);
      setTimeout(() => target.classList.remove(styles.look_at_me), 1000);
    }
  }

  function handleChange(e) {
    let inputValue = e.target.value.replace(/\s\s+/, " ");
    e.target.value = inputValue;
    inputValue = inputValue.trim();
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  function trimInput(e) {
    e.target.value = e.target.value.trim();
  }

  function handleSubmit() {
    const email = validate(login.email, "email");
    const password = validate(login.password, "password");
    if (email.ok && password.ok) {
      Axios.post("http://localhost:3001/login", login).then((response) => {
        if (!response.data.success) {
          console.log(response.data.errors);
        } else {
          authenticate(response.data.logged);
          setRedirect(true);
        }
      });
    } else {
      if (!email.ok) {
        lookAtMe("email");
        setEmailError(email.msg);
      } else {
        setEmailError(null);
      }
      if (!password.ok) {
        lookAtMe("password");
        setPasswordError("A senha deve conter ao menos 8 caracteres.");
      } else {
        setPasswordError(null);
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
        handleOnBlur={trimInput}
        info={emailError}
      />
      <InputNoBorder
        type="password"
        name="password"
        placeholder="Senha"
        labelImg={<FaKey />}
        customId={styles.password_input}
        handleOnChange={handleChange}
        handleOnBlur={trimInput}
        value={login.password ? login.password : ""}
        info={passwordError}
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
