import { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Content from "../../layout/Content";
import styles from "./ManagePet.module.css";
import FormManagePet from "../../forms/pet_management/FormManagePet";
import FormTitle from "../../forms/FormTitle";

import { FaDog, FaCat, FaPaw } from "react-icons/fa";

function ManagePet() {
  const [petName, setPetName] = useState();
  const [petEspecie, setPetEspecie] = useState();
  const useMountEffect = (func) => {
    useEffect(func, []);
  };

  const { id } = useParams();
  // Get stored pet name and species if it is an editing (id was given)
  useMountEffect(() => {
    if (id) {
      Axios.get("http://localhost:3001/get/pet?id=" + id).then((response) => {
        setPetName(response.data[0].name);
        setPetEspecie(response.data[0].idespecie);
      });
    }
  });

  return (
    <Content id={styles.ManagePet}>
      {/* Left side */}
      <div id={styles.left_side}>
        <div>
          <div id={styles.img_placeholder}>
            {petEspecie == "" || petEspecie == null ? (
              <FaPaw />
            ) : petEspecie == 1 ? (
              <FaDog />
            ) : (
              <FaCat />
            )}
          </div>
          <FormTitle
            title={petName ? petName : "Novo pet"}
            handleOnClick={() =>
              document.querySelector("input[name='name']").focus()
            }
          />
        </div>
      </div>
      {/* Right side */}
      <div id={styles.right_side}>
        <FormManagePet
          setPetName={setPetName}
          setPetEspecie={setPetEspecie}
          petID={id}
        />
      </div>
    </Content>
  );
}
export default ManagePet;
