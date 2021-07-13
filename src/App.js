import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import DeleteUser from "./components/users/DeleteUser";
import AddExpense from "./components/expenses/AddExpense";
import EditExpense from "./components/expenses/EditExpense";
import DeleteExpense from "./components/expenses/DeleteExpense";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/users/delete/:id" component={DeleteUser} />
          <Route exact path="/expenses/add" component={AddExpense} />
          <Route exact path="/expenses/edit/:id" component={EditExpense} />
          <Route exact path="/expenses/delete/:id" component={DeleteExpense} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
