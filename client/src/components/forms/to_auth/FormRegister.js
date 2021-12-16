import styles from "./FormLoginAndRegister.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

import ButtonLoginAndRegister from "./ButtonLoginAndRegister";
import InputNoBorder from "./InputNoBorder";
import FormTitle from "./FormTitle";
import {
  FaUser,
  FaEnvelope,
  FaFingerprint,
  FaKey,
  FaRegCalendarAlt,
} from "react-icons/fa";

function FormRegister() {
  const [register, setRegister] = useState([]);

  function handleChange(e) {
    setRegister({ ...register, [e.target.name]: e.target.value });
    // console.log(register);
  }

  return (
    <form className={styles.form_register}>
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
      <ButtonLoginAndRegister text="Cadastrar-se" />
      <span className={styles.link}>
        <Link to="/login">Já possui cadastro? Clique aqui para entrar.</Link>
      </span>
    </form>
  );
}

export default FormRegister;
