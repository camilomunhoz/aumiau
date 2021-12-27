import styles from "./CardAddPet.module.css";
import { useState } from "react";

function CardAddPet() {
  return (
    <div id={styles.CardAddPet} title="Adicionar pet">
      <div id={styles.plus_sign}>+</div>
    </div>
  );
}

export default CardAddPet;
