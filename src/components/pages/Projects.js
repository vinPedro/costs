import { useLocation } from "react-router-dom";

import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";

import style from "./Projects.module.css";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const location = useLocation();
  let message = location.state?.message || "";

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8080/api/projetos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          // console.log(data);
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 250);
  }, []);

  function removeProject(id) {
    fetch(`http://localhost:8080/api/projetos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setProjects(projects.filter((projects) => projects.id !== id));
        setProjectMessage({
          type: "success",
          text: "Projeto removido com sucesso!",
          key: Date.now(),
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={style.project_container}>
      <div className={style.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      <div>
        {(message || projectMessage) && <Message msg={message} />}
        <Container customClass="start">
          {projects.length > 0 &&
            projects.map((project) => (
              <ProjectCard
                id={project.id}
                name={project.nome}
                budget={project.budget}
                category={project.categoria.nome}
                key={project.id}
                handleRemove={removeProject}
              />
            ))}
          {!removeLoading && <Loading />}
          {removeLoading && projects.length === 0 && (
            <p>Não há projetos Cadastrados!</p>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Projects;
