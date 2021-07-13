import React, { useState, useEffect, componentDidMount, componentDidUpdate } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

const Home = () => {
  const [users, setUser] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const dbUsers = firebase.firestore().collection("users");
  const dbExpense = firebase.firestore().collection("expenses");

  useEffect(() => {
    getUsers();
    getExpenses();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    dbUsers.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUser(items);
      setLoading(false);
    })
  };

  const getExpenses = async () => {
    setLoading(true);
    dbExpense.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setExpenses(items);
      setLoading(false);
    })
    /*
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data.reverse());
    */
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    //loadUsers();
  };

  return (
    <div>
      <div className="container">
        <div className="py-4">
          <h1>User Table</h1>
          <table class="table border shadow">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">User Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    <Link
                      class="btn btn-primary mr-2"
                      to={`/users/edit/${user.id}`}
                    >
                      Edit
                    </Link>
                    <Link
                      class="btn btn-danger"
                      to={`/users/delete/${user.id}`}
                      //onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container">
        <div className="py-4">
          <h1>Expense Table</h1>
          <table class="table border shadow">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Category</th>
                <th scope="col">Cost</th>
                <th scope="col">Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{expense.fullName}</td>
                  <td>{expense.category}</td>
                  <td>{expense.cost}</td>
                  <td>{expense.date}</td>
                  <td>
                    <Link
                      class="btn btn-primary mr-2"
                      to={`/expenses/edit/${expense.id}`}
                    >
                      Edit
                    </Link>
                    <Link
                      class="btn btn-danger"
                      to={`/expenses/delete/${expense.id}`}
                      //onClick={() => deleteUser(expense.id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
