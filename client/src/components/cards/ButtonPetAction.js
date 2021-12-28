import styles from "./ButtonPetAction.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function ButtonPetAction({ name, petID, href, handleOnClick }) {
  const [redirect, setRedirect] = useState(false);
  return (
    <>
      {href ? (
        <Link to={href} className={styles.ButtonPetAction_link}>
          <button className={styles.ButtonPetAction} title={name}>
            {name}
          </button>
        </Link>
      ) : (
        <button
          data-pet--id={petID}
          className={styles.ButtonPetAction}
          title={name}
          onClick={handleOnClick}
        >
          {name}
        </button>
      )}
    </>
  );
}

export default ButtonPetAction;
