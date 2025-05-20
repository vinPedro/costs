import style from "../project/ProjectForm.module.css";

import { useState } from "react";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import Message from "../layout/Message";

function ServiceForm({ btnText, handleSubmit, projectData }) {
  const [service, setService] = useState({});

  const [message, setMessage] = useState();
  const [type, setType] = useState();

  function submit(e) {
    e.preventDefault();

    if (!service.name || !service.cost) {
      setMessage({
        text: "Preencha todos os campos com obrigatorios(*) ",
        key: Date.now(),
      });
      setType("error");
      return false;
    }

    else if(parseFloat(service.cost) <0){
      setMessage({
        text: "O custo não pode ser negativo!",
        key: Date.now(),
      });
      setType("error");
      return false;
    }

    // terminar de verificar
    else if(service.description && service.description.length > 100){
      setMessage({
        text: "A descrição não pode ser maior que 100 caracteres",
        key: Date.now(),
      });
      setType("error");
      return false;
    }

    projectData.services.push(service);
    handleSubmit(projectData);
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={submit} className={style.form}>
      <Input
        type="text"
        text="*Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handlerOnChange={handleChange}
      />
      <Input
        type="number"
        text="*Custo do seviço"
        name="cost"
        placeholder="Insira o valor total"
        handlerOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handlerOnChange={handleChange}
      />
      {message && <Message type={type} msg={message} />}
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
