import styles from "./ViewPet.module.css";
import Content from "../../layout/Content";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { FaDog, FaCat } from "react-icons/fa";
import ButtonPetAction from "../../cards/ButtonPetAction";

function ViewPet() {
  const [pet, setPet] = useState();
  const [viewDetails, setViewDetails] = useState(false);
  const useMountEffect = (func) => {
    useEffect(func, []);
  };

  // Get pet
  const { id } = useParams();
  useMountEffect(() => {
    if (id) {
      Axios.get("http://localhost:3001/get/pet?id=" + id).then((response) => {
        setPet(response.data[0]);
      });
    }
  });

  function getAge(birthString) {
    const date = birthString.split("/");
    const d = date[0];
    const m = date[1];
    const y = date[2];
    const birth = new Date(y, m, d);
    const today = new Date();
    const age = Math.floor((today - birth) / 1000 / 60 / 60 / 24 / 365);
    return age;
  }

  return (
    <Content id={styles.ViewPet}>
      <div className={styles.detail}></div>
      <div className={styles.detail}></div>
      {pet && pet.idespecie == 1 ? <FaDog /> : <FaCat />}
      {pet ? (
        <section id={styles.infos}>
          {viewDetails ? (
            <>
              {/* Complete infos */}
              <table id={styles.ficha}>
                <tr>
                  <td>Nome:</td>
                  <td>{pet.name}</td>
                </tr>
                <tr>
                  <td>Espécie:</td>
                  <td>{pet.especie}</td>
                </tr>
                <tr>
                  <td>Raça:</td>
                  <td>{pet.raca}</td>
                </tr>
                <tr>
                  <td>Pelagem:</td>
                  <td>{pet.furcolor}</td>
                </tr>
                <tr>
                  <td>Nascimento:</td>
                  <td>{pet.birth}</td>
                </tr>
                <tr>
                  <td>Idade:</td>
                  <td>{getAge(pet.birth)} anos</td>
                </tr>
              </table>
              <ButtonPetAction
                name="Editar"
                customId={styles.btn_edit_infos}
                href={`/pets/edit/${id}`}
              />
              <ButtonPetAction
                name="Voltar"
                handleOnClick={() => setViewDetails(false)}
                customId={styles.btn_view_description}
              />
            </>
          ) : (
            <>
              {/* Text description */}
              <p>
                <strong>{pet.name}</strong> é um {pet.especie.toLowerCase()}{" "}
                {pet.raca} de {getAge(pet.birth)} anos de idade e pelagem{" "}
                {pet.furcolor.toLowerCase()}.
              </p>
              <ButtonPetAction
                name="Ver ficha"
                handleOnClick={() => setViewDetails(true)}
                customId={styles.btn_view_ficha}
              />
            </>
          )}
        </section>
      ) : (
        // While loading...
        <p>Aguarde</p>
      )}
    </Content>
  );
}
export default ViewPet;
