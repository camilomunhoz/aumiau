import { useState, useEffect } from "react";
import styles from "./FormManagePet.module.css";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import { getAuthID } from "../../../auth";

import FormTitle from "../FormTitle";
import InputBasic from "../InputBasic";
import SelectBasic from "../SelectBasic";
import ButtonSavePet from "./ButtonSavePet";

import {
  FaRegCalendarAlt,
  FaPaw,
  FaDna,
  FaCodeBranch,
  FaPalette,
} from "react-icons/fa";

function FormManagePet({ setPetName, setPetEspecie }) {
  const [pet, setPet] = useState({ idespecie: null, iduser: getAuthID() });
  const [especies, setEspecies] = useState();
  const [racas, setRacas] = useState();
  const [redirect, setRedirect] = useState(false);
  const useMountEffect = (func) => {
    useEffect(func, []);
  };

  // Executed on first render
  useMountEffect(() => {
    Axios.get("http://localhost:3001/get/racas").then((response) =>
      setRacas(response.data)
    );
    Axios.get("http://localhost:3001/get/especies").then((response) =>
      setEspecies(response.data)
    );
  });

  // Stores the form data on change
  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value });
  }

  // Send form data to server
  function handleSubmit() {
    Axios.post("http://localhost:3001/pets/add", pet).then((response) => {
      if (!response.data.success) {
        console.log(response.data.errors);
      } else {
        setRedirect(true);
      }
    });
  }

  return (
    <form autoComplete="off" id={styles.FormManagePet}>
      {redirect && <Navigate to="/" />}

      <FormTitle title="Detalhes do pet" />
      {/* NAME */}
      <InputBasic
        labelImg={<FaPaw />}
        placeholder="Nome do pet"
        name="name"
        handleOnChange={(e) => {
          handleChange(e);
          setPetName(e.target.value);
        }}
      />
      {/* ESPECIE */}
      <SelectBasic
        labelImg={<FaDna />}
        name="idespecie"
        handleOnChange={(e) => {
          handleChange(e);
          setPetEspecie(e.target.value);
        }}
      >
        <option value="">Selecione a espécie</option>
        {especies &&
          especies.map((especie) => (
            <option value={especie.idespecie}>{especie.name}</option>
          ))}
      </SelectBasic>
      {/* RAÇA */}
      <SelectBasic
        labelImg={<FaCodeBranch />}
        name="idraca"
        handleOnChange={handleChange}
      >
        <option value="">Selecione a raça</option>
        {racas && // For dogs
          pet.idespecie == 1 &&
          racas.map((raca) => {
            return (
              raca.idespecie == 1 && (
                <option value={raca.idraca}>{raca.name}</option>
              )
            );
          })}
        {racas && // For cats
          pet.idespecie == 2 &&
          racas.map((raca) => {
            return (
              raca.idespecie == 2 && (
                <option value={raca.idraca}>{raca.name}</option>
              )
            );
          })}
      </SelectBasic>
      {/* FUR COLOR */}
      <InputBasic
        labelImg={<FaPalette />}
        placeholder="Cor do pelo"
        name="furcolor"
        handleOnChange={handleChange}
      />
      {/* BIRTH */}
      <InputBasic
        labelImg={<FaRegCalendarAlt />}
        mask="99/99/9999"
        placeholder="Data de nascimento"
        name="birth"
        handleOnChange={handleChange}
      />
      {/* SAVE */}
      <ButtonSavePet text="Salvar" handleOnClick={handleSubmit} />
    </form>
  );
}
export default FormManagePet;
