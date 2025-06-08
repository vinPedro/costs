import style from "./Project.module.css";

import { v4 as uuidv4 } from "uuid";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function createService(project) {

  
    //last service
    const lastService = project.servicos[project.servicos.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.valor || 0;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);


    //max value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage({
        type: "error",
        text: "Orçamento ultrapassado, verifique o valor do serviço",
        key: Date.now(),
      });
      setType("error");
      if (project.servicos) {
        project.servicos.pop();
      }
      return false;
    }

    //add service cost to project total cost
    project.cost = newCost;

    if (!project.servicos) {
      project.servicos = [];
    }

    //update project
    fetch(`http://localhost:8080/api/projetos/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setShowServiceForm(false);
        setMessage({type: "success", text: "Serviço adicionado ao projeto!", key: Date.now() });
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    const servicesUpdated = project.servicos.filter(
      (servico) => servico.id !== id
    );

    const projectUpdated = project;

    projectUpdated.servicos = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);
    

    fetch(`http://localhost:8080/api/projetos/${projectUpdated.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage({ type: "success", text: "Serviço removido com sucesso!", key: Date.now() });
      })
      .catch((err) => console.log(err));
  }

  function editPost(project) {
    //budget validation
    if (project.budget < project.cost) {
      setMessage({
        type: "error",
        text: "O orçamento não pode ser menor que o custo do projeto!",
        key: Date.now(),
      });
      return false;
    }

    fetch(`http://localhost:8080/api/projetos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage({
          type: "success",
          text: "Projeto Atualizado",
          key: Date.now(),
        });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:8080/api/projetos/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.servicos);
        })
        .catch((err) => console.log(err));
    }, 250);
  }, [id]);

  return (
    <>
      {project.nome ? (
        <div className={style.project_details}>
          <Container customClass="column">
            {message && <Message type="success" msg={message} />}
            <div className={style.details_container}>
              <h1>Projeto: {project.nome}</h1>
              <button className={style.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={style.project_info}>
                  <p>
                    <span>Categoria:</span> {project.categoria.nome}
                  </p>
                  <p>
                    <span>Total do orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={style.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={style.service_form_container}>
              <h2>Adicione um serviço: </h2>
              <button className={style.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={style.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    btnText="Adicionar Serviço"
                    handleSubmit={createService}
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.nome}
                    valor={service.valor}
                    description={service.descricao}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
