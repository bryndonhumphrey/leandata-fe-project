import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useHistory } from "react-router-dom";
import firebase from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Dropdown } from 'semantic-ui-react'


const AddExpense = () => {
  let history = useHistory();
  const categoryOptions = [
    { key: 'food', value: 'food', text: 'food' },
    { key: 'travel', value: 'travel', text: 'travel' },
    { key: 'health', value: 'health', text: 'health' },
    { key: 'supplies', value: 'supplies', text: 'supplies' },
  ]
  const [loading, setLoading] = useState(false);
  const [newId, setNewID] = useState({
    count: "",
  })
  const [expense, setExpense] = useState({
    fullName: "",
    category: "",
    cost: "",
    date: "",  
    id: "",
  });
  const dbExpenses = firebase.firestore().collection("expenses");
  const dbCounters = firebase.firestore().collection("counters");

  useEffect(() => {
    getExpense();
  }, []);

  const getExpense = async () => {
    setLoading(true);
    dbCounters.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      var expenseCounter = items[0];
      console.log(expenseCounter)
      var newId = (Number(expenseCounter.count) + 1);
      console.log(newId)
      setExpense({...expense, id: newId});
      setNewID({...newId, count: Number(newId)});
      setLoading(false);
    })
  };

  const { fullName, category, cost, date, id } = expense;
  const onInputChange = e => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };


  const onSubmit = async e => {
    e.preventDefault();
    const res = await dbExpenses.doc().set(expense);
    const res2 = await dbCounters.doc("expenses").set(newId);
    history.push("/");
  };
  
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Expense</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Select Full Name"
              name="fullName"
              value={fullName}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Dropdown
              className="form-control form-control-lg"
              placeholder='Select Category'
              fluid
              search
              selection
              options={categoryOptions}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Cost"
              name="cost"
              value={cost}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Date"
              name="date"
              value={date}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="ID is auto populated"
              name="id"
              value={id}
              onChange={e => onInputChange(e)}
              disabled
            />
          </div>
          <button className="btn btn-primary btn-block">Add Expense</button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
