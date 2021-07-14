import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container } from "semantic-ui-react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        
        <Link className="navbar-brand" exact to="/">
          LeanData FE Project
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
          </ul>
        </div>
          <Link className="btn btn-outline-light" to="/users/add">Add User</Link>
          <Link className="btn btn-outline-light" to="/expenses/add">Add Expense</Link>
      </div>
    </nav>
  );
};

export default Navbar;
