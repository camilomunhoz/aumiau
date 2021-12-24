import { Navigate } from "react-router-dom";

function PrivateRoute(props) {
  return (
    <>
      {localStorage.getItem("aumiau_logged") ? (
        props.children
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default PrivateRoute;
