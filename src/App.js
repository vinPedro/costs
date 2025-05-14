import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import NewProject from "./components/pages/NewProject";
import Contact from "./components/pages/Contact";
import Company from "./components/pages/Company";

import Container from "./components/layout/Container";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Projects from "./components/pages/Projects";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route element={<Container customClass="min-height"/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/company" element={<Company />} />
          <Route path="/newproject" element={<NewProject/>} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
