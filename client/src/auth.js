const isLogged = () => {
  return !!localStorage.getItem("aumiau_logged");
};

const authenticate = (id) => localStorage.setItem("aumiau_logged", id);

const unauthenticate = () => localStorage.removeItem("aumiau_logged");

export default isLogged;
export { authenticate, unauthenticate };
