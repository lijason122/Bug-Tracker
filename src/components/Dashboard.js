import React, { useState, useEffect } from "react";
import { Card, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [bugCount, setBugCount] = useState(0);

  useEffect(() => {
    db.collection("users")
      .where("id", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc) => setBugCount(doc.data().bugCount));
      });
  }, [currentUser]);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "92vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h1 className="mb-5">Welcome, {currentUser.displayName}!</h1>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
            <br />
            <strong>Signed in as:</strong> {currentUser.displayName}
            <br />
            You currently have <strong>({bugCount})</strong> ongoing bug
            {bugCount === 1 ? "" : "s"}
            <Link to="/bug-tracker" className="btn btn-primary w-100 mt-3">
              Bug Tracker
            </Link>
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button className="link" variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
