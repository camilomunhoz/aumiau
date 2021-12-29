import styles from "./ButtonPetAction.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function ButtonPetAction({ name, petID, href, handleOnClick, customId }) {
  const [redirect, setRedirect] = useState(false);
  return (
    <>
      {href ? (
        <Link to={href} className={styles.ButtonPetAction_link}>
          <button className={styles.ButtonPetAction} title={name} id={customId}>
            {name}
          </button>
        </Link>
      ) : (
        <button
          data-pet--id={petID}
          className={styles.ButtonPetAction}
          title={name}
          onClick={handleOnClick}
          id={customId}
        >
          {name}
        </button>
      )}
    </>
  );
}

export default ButtonPetAction;
