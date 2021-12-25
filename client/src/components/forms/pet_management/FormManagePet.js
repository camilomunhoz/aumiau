import { useState } from "react";
import styles from "./FormManagePet.module.css";
import FormTitle from "../FormTitle";
import InputBasic from "../InputBasic";
import SelectBasic from "../SelectBasic";
import ButtonSavePet from "./ButtonSavePet";

import {
  FaRegCalendarAlt,
  FaDog,
  FaCat,
  FaPaw,
  FaDna,
  FaCodeBranch,
  FaPalette,
} from "react-icons/fa";

function FormManagePet({ setPetName, setPetEspecie }) {
  const [pet, setPet] = useState({ idespecie: null });

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value });
  }

  return (
    <form id={styles.FormManagePet}>
      <FormTitle title="Novo pet" />
      <InputBasic
        labelImg={<FaPaw />}
        placeholder="Nome do pet"
        name="name"
        handleOnChange={(e) => {
          handleChange(e);
          setPetName(e.target.value);
        }}
      />
      <SelectBasic
        labelImg={<FaDna />}
        name="idespecie"
        handleOnChange={(e) => {
          handleChange(e);
          setPetEspecie(e.target.value);
          console.log(e.target.value);
        }}
      >
        <option value="">Selecione a espécie</option>
        <option value="1">Cachorro</option>
        <option value="2">Gato</option>
      </SelectBasic>
      <SelectBasic
        labelImg={<FaCodeBranch />}
        name="idraca"
        handleOnChange={handleChange}
      >
        <option value="">Selecione a raça</option>
        <option value="1">Cachorro</option>
        <option value="2">Gato</option>
      </SelectBasic>
      <InputBasic
        labelImg={<FaPalette />}
        placeholder="Cor do pelo"
        name="furcolor"
        handleOnChange={handleChange}
      />
      <InputBasic
        labelImg={<FaRegCalendarAlt />}
        mask="99/99/9999"
        placeholder="Data de nascimento"
        name="birth"
        handleOnChange={handleChange}
      />
      <ButtonSavePet text="Salvar" />
    </form>
  );
}
export default FormManagePet;
