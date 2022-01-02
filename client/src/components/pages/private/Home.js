import CardAddPet from "../../cards/CardAddPet";
import CardPet from "../../cards/CardPet";
import Content from "../../layout/Content";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { getAuthID } from "../../../auth.js";

function Home() {
  const [pets, setPets] = useState();

  const useMountEffect = (func) => {
    useEffect(func, []);
  };

  // Executed on first render
  useMountEffect(() => {
    Axios.get("http://localhost:3001/get/pets/user?id=" + getAuthID()).then(
      (response) => {
        setPets(response.data);
      }
    );
  });

  return (
    <Content id={styles.Home}>
      <div id={styles.cards_container}>
        {/* Adds cards for the user's pets */}
        {pets &&
          pets.map((pet) => (
            <CardPet
              key={pet.idpet}
              name={pet.name}
              especie={pet.idespecie}
              petID={pet.idpet}
            />
          ))}
        {/* Card with plus sign to add pets */}
        <Link to="/pets/add">
          <CardAddPet />
        </Link>
      </div>
    </Content>
  );
}

export default Home;
