import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import firebase from "../../firebase";

const User = () => {
  //routing and getting unique id that was encoded in URL
  let history = useHistory();
  const { id } = useParams();
  //initializing state
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    webiste: ""
  });
  //firebase collections
  const dbUsers = firebase.firestore().collection("users");

  useEffect(() => {
    loadUser();
  }, []);

  const deleteUser = async e => {
    const { firstName, lastName, budget, id } = user;
    const dbUser = await dbUsers.where('id', '==', id).get()
    var docId = null;
    //START this code is funky but so far it is the only way i've found to get the pre-populated firebase id's aka doc id
    if (dbUser.empty) {
      console.log('No matching documents.');
      return;
    }  
    dbUser.forEach(doc => {
      docId = doc.id ;
    });
    const res = await dbUsers.doc(docId).delete();
    //END this code is funky but so far it is the only way i've found to get the pre-populated firebase id's aka doc id
    history.push("/");
  };


  const loadUser = async () => {
    setLoading(true);
    dbUsers.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      //destucturing firebase users, using the index of the item with the same unique ID that was passed in the url
      const destructedItems = items.map(item=> item.id)
      var indexNum = null;
      for(let i = 0; i < destructedItems.length; i++){
        if (destructedItems[i] == id){
          indexNum = i;
        } else{
          continue
        }
      }
      setUser(items[indexNum]);
      setLoading(false);
    })
  };
 
  return (
    <div className="container py-4">
      <h1 className="display-4">Are you sure you would like to delete user {user.firstName} {user.lastName}?</h1>
      <ul className="list-group w-50">
      </ul>
      <Link className="btn btn-primary" to="/" onClick={() => deleteUser(user.id)}>
        Delete User
      </Link>
      <Link className="btn btn-primary" to="/">
        no
      </Link>

    </div>
  );
};

export default User;
