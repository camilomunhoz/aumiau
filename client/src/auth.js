const isLogged = () => {
  return !!localStorage.getItem("aumiau_logged");
};
const getAuthID = () => {
  return localStorage.getItem("aumiau_logged");
};

const authenticate = (id) => localStorage.setItem("aumiau_logged", id);

const unauthenticate = () => {
  localStorage.removeItem("aumiau_logged");
  document.location.reload();
};

export default isLogged;
export { authenticate, unauthenticate, getAuthID };
