import "./FormLoginAndRegister.module.css";
import { Link } from "react-router-dom";

import InputNoBorder from "./InputNoBorder";
import FormTitle from "./FormTitle";
import {
  FaUser,
  FaEnvelope,
  FaFingerprint,
  FaLock,
  FaRegCalendarAlt,
} from "react-icons/fa";

function FormRegister() {
  return (
    <form className="form_register">
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
      />
      <InputNoBorder
        type="password"
        name="password"
        placeholder="Senha"
        labelImg={<FaLock />}
      />
      <InputNoBorder
        type="text"
        name="birth"
        placeholder="Data de nascimento"
        labelImg={<FaRegCalendarAlt />}
      />
      <Link to="/login">Já possui cadastro? Clique aqui para entrar.</Link>
    </form>
  );
}

export default FormRegister;
