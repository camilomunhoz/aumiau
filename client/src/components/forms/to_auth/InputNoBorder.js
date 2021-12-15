import "./InputNoBorder.module.css";

function InputNoBorder({ type, name, placeholder, labelImg, handleOnChange }) {
  return (
    <div className="no_border_input">
      <input type={type} name={name} placeholder={placeholder} />
      {labelImg}
    </div>
  );
}

export default InputNoBorder;
