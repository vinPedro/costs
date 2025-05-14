import { Link } from "react-router-dom";

import Container from "./Container";

import style from "./NavBar.module.css";
import logo from "../../img/costs_logo.png";

function NavBar() {
  return (
    <nav className={style.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs" />
        </Link>

        <ul className={style.list}>
          <li className={style.item}>
            <Link to="/">Home</Link>
          </li>
           <li className={style.item}>
            <Link to="/projects">Projetos</Link>
          </li>
          <li className={style.item}>
            <Link to="/company">Company</Link>
          </li>
          <li className={style.item}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default NavBar;
