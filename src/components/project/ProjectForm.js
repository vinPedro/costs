import { useEffect, useState } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import Message from "../layout/Message";

import style from "./ProjectForm.module.css";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/api/categorias", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    // console.log(project)
    if (
      !project.nome ||
      !project.budget ||
      !project.categoria ||
      project.categoria.nome === "Selecione uma opção:"
    ) {
      setMessage({type: "error", text: "Preencha todos os campos!", key: Date.now() });
      return false;
    } else if (parseFloat(project.budget) < 0) {
      setMessage({
        type: "error",
        text: "O orçamento não pode ser negativo!",
        key: Date.now(),
      });
      return false;
    } else if (project.nome.length > 24) {
      setMessage({
        type: "error",
        text: "O nome não pode ser maior que 24 caracteres",
        key: Date.now(),
      });
      return false;
    }

    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      categoria: {
        id: e.target.value,
        nome: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={style.projectform_container}>
      <Input
        type="text"
        text="Nome do projeto"
        name="nome"
        placeholder="Insira o nome do Projeto:"
        handlerOnChange={handleChange}
        value={project.nome ? project.nome : ""}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total:"
        handlerOnChange={handleChange}
        value={project.budget ? project.budget : ""}
      />
      <Select
        name="categoria_id"
        text="Selecione a categoria"
        options={categories}
        handlerOnChange={handleCategory}
        value={project.categoria ? project.categoria.id : ""}
      />
      {message && <Message type={type} msg={message} />}
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
