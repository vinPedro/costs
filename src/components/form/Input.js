import style from "./Input.module.css";

function Input({ type, text, name, placeholder, handlerOnChange, value }) {
  return (
    <div className={style.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handlerOnChange}
        value={value}
      />
    </div>
  );
}

export default Input;
