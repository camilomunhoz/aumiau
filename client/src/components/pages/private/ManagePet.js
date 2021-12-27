import { useState } from "react";
import Content from "../../layouts/Content";
import styles from "./ManagePet.module.css";
import FormManagePet from "../../forms/pet_management/FormManagePet";
import FormTitle from "../../forms/FormTitle";

import { FaDog, FaCat, FaPaw } from "react-icons/fa";

function ManagePet() {
  const [petName, setPetName] = useState();
  const [petEspecie, setPetEspecie] = useState();

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
          <FormTitle title={petName ? petName : "Novo pet"} />
        </div>
      </div>
      {/* Right side */}
      <div id={styles.right_side}>
        <FormManagePet setPetName={setPetName} setPetEspecie={setPetEspecie} />
      </div>
    </Content>
  );
}
export default ManagePet;
