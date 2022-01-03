import React, { Component } from "react";
import Form from "./Form";
import Table from "./Table";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Cadastrar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/Table"
                  >
                    Lista
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route exact path = '/' element = {<Form/>}></Route>
          <Route path = '/Table' element = {<Table/>}></Route>
        </Routes>
      </Router>
    );
  }
}

export default NavBar;
