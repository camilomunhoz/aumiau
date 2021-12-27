import styles from "./CardPet.module.css";
import { useState } from "react";
import { FaDog, FaCat } from "react-icons/fa";

function CardPet({ name, raca, especie, birth, furcolor }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipCard = () => (isFlipped ? setIsFlipped(false) : setIsFlipped(true));

  return (
    <div className={styles.card_scene}>
      <div
        className={`${styles.card_body} ${isFlipped && styles.card_is_flipped}`}
        onClick={flipCard}
      >
        <div className={styles.card_face_front}>
          <div className={styles.card_img}>
            {especie == 1 && <FaDog />}
            {especie == 2 && <FaCat />}
          </div>
          <span className={styles.card_pet_name}>{name}</span>
        </div>
        <div className={styles.card_face_back}>Detalhes</div>
      </div>
    </div>
  );
}

export default CardPet;
