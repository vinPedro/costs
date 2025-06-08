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

    if (!service.nome || !service.valor) {
      setMessage({
        type: "error",
        text: "Preencha todos os campos com obrigatorios(*) ",
        key: Date.now(),
      });
      return false;
    } else if (parseFloat(service.valor) < 0) {
      setMessage({
        type: "error",
        text: "O custo não pode ser negativo!",
        key: Date.now(),
      });
      return false;
    }

    // terminar de verificar
    else if (service.descricao && service.descricao.length > 100) {
      setMessage({
        type: "error",
        text: "A descrição não pode ser maior que 100 caracteres",
        key: Date.now(),
      });
      return false;
    }

    if (!projectData.servicos) {
      console.log(projectData.servicos);
      projectData.servicos = [];
    }

    projectData.servicos.push({
      ...service,
      valor: parseFloat(service.valor),
    });
    
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
        name="nome"
        placeholder="Insira o nome do serviço"
        handlerOnChange={handleChange}
        value={service.nome || ""}
      />
      <Input
        type="number"
        text="*Custo do seviço"
        name="valor"
        placeholder="Insira o valor total"
        handlerOnChange={handleChange}
        value={service.valor || ""}
      />
      <Input
        type="text"
        text="Descrição do serviço"
        name="descricao"
        placeholder="Descreva o serviço"
        handlerOnChange={handleChange}
        value={service.descricao || ""}
      />
      {message && <Message type={type} msg={message} />}
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
