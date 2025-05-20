import { useEffect, useState } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import Message from "../layout/Message";

import style from "./ProjectForm.module.css";

function ProjectForm({ handleSubmit, btnText, projectData }) {

  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});
  const [message, setMessage] = useState()
  const [type, setType] = useState()

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "aplication/json",
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
    if (!project.name || !project.budget || !project.category || project.category.name === "Selecione uma opção:") {
      setMessage({text: "Preencha todos os campos!", key: Date.now() })
      setType('error')
      return false;
    }

    else if(parseFloat(project.budget) < 0){
      setMessage({text: "O orçamento não pode ser negativo!", key: Date.now() })
      setType('error')
      return false;
    }

    else if(project.name.length > 24){
      setMessage({
        text: "O nome não pode ser maior que 24 caracteres",
        key: Date.now(),
      });
      setType("error");
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
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    
    <form onSubmit={submit} className={style.projectform_container}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do Projeto:"
        handlerOnChange={handleChange}
        value={project.name ? project.name : ""}
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
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handlerOnChange={handleCategory}
        value={project.category ? project.category.id : ""}
      />
      {message && <Message type={type} msg={message} />}
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
