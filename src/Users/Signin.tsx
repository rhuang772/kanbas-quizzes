import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
import Signup from "./Signup";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };
  return (
    <>
      <div>
        <h1>Sign-In</h1>
        <input style={{ width: "180px" }} className="form-control" value={credentials.username} placeholder="Username" onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })} /><br />
        <input style={{ width: "180px" }} className="form-control" value={credentials.password} placeholder="Password" onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })} /><br />
        <button style={{ width: "180px" }} className="btn btn-primary" onClick={signin}> Signin </button>
      </div><br/>
      <Signup/>
    </>
  );
}
