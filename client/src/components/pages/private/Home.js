import CardAddPet from "../../cards/CardAddPet";
import CardPet from "../../cards/CardPet";
import Content from "../../layouts/Content";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Content id={styles.Home}>
      <div id={styles.cards_container}>
        <CardPet name="Hanna" especie={1} />
        <CardPet name="Mika" especie={2} />
        <Link to="/pets/add">
          <CardAddPet />
        </Link>
      </div>
    </Content>
  );
}

export default Home;
