import { useState } from "react";

function HelloWorld() {
  const [name, setName] = useState();
  const [userName, setUserName] = useState();

  function metodo(e) {
    e.preventDefault();
    setUserName(name);
    alert(name);
  }

  return (
    <>
      {
        <form onSubmit={metodo}>
          <input
            placeholder="Nome"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input type="submit" />
          {name && <h1>Olá, {name}</h1>}
        </form>
      }
    </>
  );
}

export default HelloWorld;
