import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import firebase from "../../firebase";

const EditUser = () => {
  //routing and getting unique id that was encoded in URL
  let history = useHistory();
  const { id } = useParams();
  //initializing state
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    budget: "",  
    id: "",
  });
  //firebase collection
  const dbUsers = firebase.firestore().collection("users");

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

  //form input to state logic
  const { firstName, lastName, budget } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  //updating user data in firebase
  const onSubmit = async e => {
    e.preventDefault();
    //destructering user object from state so it will set into firebase properly
    const { firstName, lastName, budget, id } = user;
    const dbUser = await dbUsers.where('id', '==', id).get()
    //START this code is funky but so far it is the only way i've found to get the pre-populated firebase id's aka doc id
    var docId = null;
    if (dbUser.empty) {
      console.log('No matching documents.');
      return;
    }  
    dbUser.forEach(doc => {
      docId = doc.id ;
    });
    const res = await dbUsers.doc(docId).set(user,{ merge: true });
    //END this code is funky but so far it is the only way i've found to get the pre-populated firebase id's aka doc id
    history.push("/");
  };

  //template
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit User</h2>
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
              placeholder="Enter Last Username"
              name="lastName"
              value={lastName}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Budget (optional)"
              name="budget"
              value={budget}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="id"
              value={id}
              onChange={e => onInputChange(e)}
              disabled
            />
          </div>
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
