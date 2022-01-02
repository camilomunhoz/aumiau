import styles from "./CardPet.module.css";
import { useState } from "react";
import { FaDog, FaCat } from "react-icons/fa";
import ButtonPetAction from "./ButtonPetAction";
import ButtonClosePetActions from "./ButtonClosePetActions";
import Axios from "axios";

function CardPet({ petID, name, especie }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isUnderDeletion, setIsUnderDeletion] = useState(false);

  function removePet(e) {
    const cardToRemove = e.target.parentNode.parentNode.parentNode; // bleh
    const id = e.target.getAttribute("data-pet--id");
    Axios.delete("http://localhost:3001/delete/pet/" + id, {
      data: { id: id },
    }).then(() => {
      cardToRemove.firstChild.style.transform = "rotateY(-90deg)";
      setTimeout(() => cardToRemove.remove(), 650);
    });
  }

  return (
    <div
      className={styles.card_scene}
      data-pet--id={petID}
      title={!isFlipped && "Ver ações"}
    >
      <div
        className={`${styles.card_body} ${isFlipped && styles.card_is_flipped}`}
      >
        <div
          className={styles.card_face_front}
          onClick={() => setIsFlipped(true)}
        >
          <div className={styles.card_img}>
            {especie == 1 && <FaDog />}
            {especie == 2 && <FaCat />}
          </div>
          <span className={styles.card_pet_name}>{name}</span>
        </div>
        <div
          className={`${styles.card_face_back} ${
            isUnderDeletion && styles.deletion_dialog
          }`}
        >
          {isUnderDeletion ? (
            <>
              <span>Remover animal?</span>
              <ButtonPetAction
                name="Sim"
                petID={petID}
                handleOnClick={removePet}
              />
              <ButtonPetAction
                name="Não"
                handleOnClick={() => setIsUnderDeletion(false)}
              />
            </>
          ) : (
            <>
              <ButtonClosePetActions
                name="Fechar"
                handleOnClick={() => setIsFlipped(false)}
              />
              <ButtonPetAction name="Visualizar pet" href={"/pets/" + petID} />
              <ButtonPetAction name="Editar pet" href={"/pets/edit/" + petID} />
              <ButtonPetAction
                name="Apagar pet"
                handleOnClick={() => setIsUnderDeletion(true)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardPet;
