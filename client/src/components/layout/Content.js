import styles from "./Content.module.css";

function Content(props) {
  return <section id={props.id}>{props.children}</section>;
}

export default Content;
