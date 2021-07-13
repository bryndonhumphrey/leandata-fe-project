import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useHistory } from "react-router-dom";
import firebase from "../../firebase";
import { doc, setDoc } from "firebase/firestore";


const AddUser = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [newId, setNewID] = useState({
    count: "",
  })
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    budget: "",  
    id: "",
  });
  const dbUsers = firebase.firestore().collection("users");
  const dbCounters = firebase.firestore().collection("counters");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    dbCounters.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      var userCounter = items.pop();
      var newId = (Number(userCounter.count) + 1);
      setUser({...user, id: newId});
      setNewID({...newId, count: Number(newId)});

      setLoading(false);
    })
  };

  const { firstName, lastName, budget, id } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const onSubmit = async e => {
    e.preventDefault();
    const res = await dbUsers.doc().set(user);
    const res2 = await dbCounters.doc("users").set(newId);
    history.push("/");
  };
  
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter First Name"
              name="firstName"
              value={firstName}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Last Name"
              name="lastName"
              value={lastName}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Budget (Optional)"
              name="budget"
              value={budget}
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
          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
