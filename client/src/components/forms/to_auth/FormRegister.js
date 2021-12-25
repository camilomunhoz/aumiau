import styles from "./FormLoginAndRegister.module.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import isLogged, { authenticate } from "../../../auth";

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

  function handleChange(e) {
    setRegister({ ...register, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    Axios.post("http://localhost:3001/register", register).then((response) => {
      if (!response.data.success) {
        console.log(response.data.errors);
      } else {
        authenticate(response.data.logged);
        setRedirect(true);
      }
    });
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
      />
      <InputNoBorder
        type="text"
        name="email"
        placeholder="E-mail"
        labelImg={<FaEnvelope />}
        handleOnChange={handleChange}
      />
      <InputNoBorder
        type="text"
        name="cpf"
        placeholder="CPF"
        labelImg={<FaFingerprint />}
        mask="999.999.999-99"
        handleOnChange={handleChange}
      />
      <InputNoBorder
        type="text"
        name="birth"
        placeholder="Data de nascimento"
        labelImg={<FaRegCalendarAlt />}
        mask="99/99/9999"
        handleOnChange={handleChange}
      />
      <InputNoBorder
        type="password"
        name="password"
        placeholder="Senha"
        labelImg={<FaKey />}
        customId={styles.password_input}
        handleOnChange={handleChange}
        value={register.password ? register.password : ""}
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
