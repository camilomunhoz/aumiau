import styles from "./FormLoginAndRegister.module.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import isLogged, { authenticate } from "../../../auth";
import validate from "../../../validations";

import ButtonLoginAndRegister from "./ButtonLoginAndRegister";
import InputNoBorder from "../InputNoBorder";
import FormTitle from "../FormTitle";
import {
  FaUser,
  FaEnvelope,
  FaFingerprint,
  FaKey,
  FaRegCalendarAlt,
} from "react-icons/fa";

function FormRegister() {
  const [register, setRegister] = useState([]);
  const [redirect, setRedirect] = useState(isLogged());
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [birthError, setBirthError] = useState(null);
  const [cpfError, setCpfError] = useState(null);

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
    setRegister({ ...register, [e.target.name]: inputValue });
  }

  function trimInput(e) {
    e.target.value = e.target.value.trim();
  }

  function handleSubmit() {
    const name = validate(register.name, "fullname");
    const email = validate(register.email, "email");
    const password = validate(register.password, "password");
    const birth = validate(register.birth, "date");
    const cpf = validate(register.cpf, "cpf");

    // Send only if all fields are ok
    if (name.ok && email.ok && password.ok && birth.ok && cpf.ok) {
      Axios.post("http://localhost:3001/register", register).then(
        (response) => {
          if (!response.data.success) {
            console.log(response.data.errors);
          } else {
            authenticate(response.data.logged);
            setRedirect(true);
          }
        }
      );
    }
    // If not, draw attention to the incorrect fields and assign error messages
    else {
      if (!name.ok) {
        lookAtMe("name");
        setNameError(name.msg);
      } else {
        setNameError(null);
      }
      if (!email.ok) {
        lookAtMe("email");
        setEmailError(email.msg);
      } else {
        setEmailError(null);
      }
      if (!password.ok) {
        lookAtMe("password");
      }
      if (!birth.ok) {
        lookAtMe("birth");
        setBirthError(birth.msg);
      } else {
        setBirthError(null);
      }
      if (!validate(register.cpf, "cpf").ok) {
        lookAtMe("cpf");
        setCpfError(cpf.msg);
      } else {
        setCpfError(null);
      }
    }
  }

  return (
    <form id={styles.form_register}>
      {redirect && <Navigate to="/" />}

      <FormTitle title="CADASTRE-SE" />
      <InputNoBorder
        type="text"
        name="name"
        placeholder="Nome completo"
        labelImg={<FaUser />}
        handleOnChange={handleChange}
        handleOnBlur={trimInput}
        info={nameError}
      />
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
        type="text"
        name="cpf"
        placeholder="CPF"
        labelImg={<FaFingerprint />}
        mask="999.999.999-99"
        handleOnChange={handleChange}
        info={cpfError}
      />
      <InputNoBorder
        type="text"
        name="birth"
        placeholder="Data de nascimento"
        labelImg={<FaRegCalendarAlt />}
        mask="99/99/9999"
        handleOnChange={handleChange}
        info={birthError}
      />
      <InputNoBorder
        type="password"
        name="password"
        placeholder="Senha"
        labelImg={<FaKey />}
        customId={styles.password_input}
        handleOnChange={handleChange}
        value={register.password ? register.password : ""}
        info="A senha deve conter ao menos 8 caracteres."
        handleOnBlur={trimInput}
      />
      <ButtonLoginAndRegister
        text="Cadastrar-se"
        handleOnClick={handleSubmit}
      />
      <span className={styles.link}>
        <Link to="/">Já possui cadastro? Clique aqui para entrar.</Link>
      </span>
    </form>
  );
}

export default FormRegister;
