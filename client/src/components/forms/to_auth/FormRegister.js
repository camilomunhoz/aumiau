import styles from "./FormLoginAndRegister.module.css";
import { Link } from "react-router-dom";

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
  return (
    <form className={styles.form_register}>
      <FormTitle title="REGISTRAR-SE" />
      <InputNoBorder
        type="text"
        name="name"
        placeholder="Nome completo"
        labelImg={<FaUser />}
      />
      <InputNoBorder
        type="text"
        name="email"
        placeholder="E-mail"
        labelImg={<FaEnvelope />}
      />
      <InputNoBorder
        type="text"
        name="cpf"
        placeholder="CPF"
        labelImg={<FaFingerprint />}
        mask="999.999.999-99"
      />
      <InputNoBorder
        type="text"
        name="birth"
        placeholder="Data de nascimento"
        labelImg={<FaRegCalendarAlt />}
        customClass
      />
      <InputNoBorder
        type="password"
        name="password"
        placeholder="Senha"
        labelImg={<FaKey />}
        customId={styles.password_input}
      />
      <span className={styles.link}>
        <Link to="/login">Já possui cadastro? Clique aqui para entrar.</Link>
      </span>
    </form>
  );
}

export default FormRegister;
