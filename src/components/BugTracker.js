import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { db, increment, decrement } from "../firebase";
import { Link } from "react-router-dom";
import BugTable from "./BugTable";
import { useAuth } from "../contexts/AuthContext";

const BugTracker = () => {
  const [newBugDescription, setNewBugDescription] = useState("");
  const [newBugPriority, setNewBugPriority] = useState("Medium");
  const [bugList, setBugList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [userList, setUserList] = useState([]);
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    db.collection("bugs")
      .orderBy("order", "asc")
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({ ...doc.data(), key: doc.id })
        );
        setBugList(arr);
        setLoading(false);
      });
  }, [loading]);

  useEffect(() => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({ ...doc.data(), key: doc.id })
        );
        setUserList(arr);
      });
  }, []);

  const addBug = (event) => {
    event.preventDefault();
    const newBug = {
      description: newBugDescription,
      priority: newBugPriority,
      createBy: currentUser.displayName,
      assignedTo: newUser,
      order:
        newBugPriority === "High" ? 1 : newBugPriority === "Medium" ? 2 : 3,
    };

    setNewBugDescription("");
    setNewBugPriority("Medium");

    db.collection("users").doc(newUser).update({ bugCount: increment });
    db.collection("bugs").add(newBug);
    setLoading(true);
  };

  const deleteBug = (id, user) => {
    db.collection("users").doc(user).update({ bugCount: decrement });
    db.collection("bugs").doc(id).delete();
    setLoading(true);
  };

  return (
    <div>
      <h1>Bug Tracker 🐛</h1>
      <BugTable
        bugs={bugList}
        onDeleteBug={(id, user) => deleteBug(id, user)}
      />
      <form onSubmit={addBug}>
        <Form.Group id="newBugDescription">
          <Form.Label>New Bug Description:</Form.Label>
          <Form.Control
            type="text"
            required
            value={newBugDescription}
            onChange={(event) => setNewBugDescription(event.target.value)}
          />
        </Form.Group>
        <Form.Group id="newBugPriority" className="mt-3">
          <Form.Label>New Bug Priority:</Form.Label>
          <Form.Select
            type="text"
            required
            value={newBugPriority}
            onChange={(event) => setNewBugPriority(event.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Select>
        </Form.Group>
        <Form.Group id="newUser" className="mt-3">
          <Form.Label>Assign To:</Form.Label>
          <Form.Select
            type="text"
            required
            value={newUser}
            onChange={(event) => setNewUser(event.target.value)}
          >
            <option>Select User</option>
            {userList.map((user, i) => {
              return (
                <option key={i} value={user.name}>
                  {user.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Button className="w-100 mt-3 btn-info" type="submit">
          Add New Bug
        </Button>
      </form>
      <div className="w-100 text-center mt-4">
        <Link to="/" className="link">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default BugTracker;
