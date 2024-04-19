import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ _id: "", username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input style={{ width: "180px" }} className="form-control" value={user._id} placeholder="ID (numbers only)" onChange={(e) => setUser({
          ...user, _id:e.target.value })} /><br/>
      <input style={{ width: "180px" }} className="form-control" value={user.username} placeholder="Username" onChange={(e) => setUser({
          ...user, username: e.target.value })} /><br/>
      <input style={{ width: "180px" }} className="form-control" value={user.password} placeholder="Password" onChange={(e) => setUser({
          ...user, password: e.target.value })} /><br/>
      <button style={{ width: "180px" }} className="btn btn-primary" onClick={signup}> Signup </button>
    </div>
  );
}
