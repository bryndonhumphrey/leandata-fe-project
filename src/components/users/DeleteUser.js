import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    webiste: ""
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">Are you sure you would like to delete user {id}?</h1>
      <ul className="list-group w-50">
        <li className="list-group-item">name: {user.firstName}</li>
        <li className="list-group-item">user name: {user.lastName}</li>
      </ul>
      <Link className="btn btn-primary" to="/">
        Delete User
      </Link>
      <Link className="btn btn-primary" to="/">
        no
      </Link>
      <hr />
    </div>
  );
};

export default User;
