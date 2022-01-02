import { useState, useEffect } from "react";
import Axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import Content from "../../layout/Content";
import styles from "./ManagePet.module.css";
import FormManagePet from "../../forms/pet_management/FormManagePet";
import FormTitle from "../../forms/FormTitle";
import Alert from "../../layout/Alert";
import { getAuthID } from "../../../auth";

import { FaDog, FaCat, FaPaw } from "react-icons/fa";

function ManagePet() {
  const [petName, setPetName] = useState();
  const [petEspecie, setPetEspecie] = useState();
  const [error, setError] = useState();

  // Related to the limit of registered pets (3)
  const [isFull, setIsFull] = useState(false);
  const [timer, setTimer] = useState(5);
  let secs = 5;

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
    } else {
      Axios.get("http://localhost:3001/get/pets/user?id=" + getAuthID()).then(
        (response) => {
          if (response.data.length >= 3) {
            setInterval(() => setTimer(--secs), 1000);
            setIsFull(true);
          }
        }
      );
    }
  });

  return (
    <Content id={styles.ManagePet}>
      {!isFull ? (
        // If the user didn't reach the limit of 3 pets
        <>
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
                  !id && document.querySelector("input[name='name']").focus()
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
              setError={setError}
            />
          </div>
          {/* If there is some error */}
          {error && <Alert msg={error} handleOnClose={() => setError(null)} />}
        </>
      ) : (
        // If the user has reached the limit of 3 pets
        <>
          <p id={styles.limit_reached}>
            Você atingiu o limite máximo de 3 pets cadastrados.
            <br />
            <i>Redirecionando para o menu em {timer}</i>.
          </p>
          {!timer && <Navigate to="/" />}
        </>
      )}
    </Content>
  );
}
export default ManagePet;
