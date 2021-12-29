import styles from "./ViewPet.module.css";
import Content from "../../layouts/Content";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { FaDog, FaCat } from "react-icons/fa";

function ViewPet() {
  const [pet, setPet] = useState();
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
        <p>
          <strong>{pet.name}</strong> é um {pet.especie.toLowerCase()}{" "}
          {pet.raca} de {getAge(pet.birth)} anos de idade e pelagem{" "}
          {pet.furcolor}.
        </p>
      ) : (
        <p>Aguarde</p>
      )}
    </Content>
  );
}
export default ViewPet;
