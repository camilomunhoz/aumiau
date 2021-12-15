import "./FormLoginAndRegister.module.css";
import { Link } from "react-router-dom";

import InputNoBorder from "./InputNoBorder";
import FormTitle from "./FormTitle";
import { FaEnvelope, FaLock } from "react-icons/fa";

function FormLogin() {
  return (
    <form className="form_login">
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
        labelImg={<FaLock />}
      />
      <Link to="/register">
        Não possui cadastro? Clique aqui para se cadastrar.
      </Link>
    </form>
  );
}

export default FormLogin;