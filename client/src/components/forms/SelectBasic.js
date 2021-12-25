import styles from "./SelectBasic.module.css";

function SelectBasic(props) {
  return (
    <div className={styles.basic_select}>
      {props.labelImg}
      <select name={props.name} onChange={props.handleOnChange}>
        {props.children}
      </select>
    </div>
  );
}

export default SelectBasic;
