import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({ _id: "", username: "", password: "", 
    firstName: "", lastName: "", email: "", dob: "", role: "USER" });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    console.log(account);
    setProfile(account);
  };
  const save = async (unique_profile: any) => {
    console.log("From the profile screen: " + unique_profile._id);
    await client.updateUser(unique_profile);
  };
  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  }
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      {profile && (
        <div>
          <input style={{width: "180px"}} className="form-control" value={profile.username} onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })}/><br/>
          <input style={{width: "180px"}} className="form-control" value={profile.password} onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })}/><br/>
          <input style={{width: "180px"}} className="form-control" value={profile.firstName} onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })}/><br/>
          <input style={{width: "180px"}} className="form-control" value={profile.lastName} onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })}/><br/>
          <input style={{width: "180px"}} className="form-control" value={profile.dob} type="date" onChange={(e) =>
            setProfile({ ...profile, dob: e.target.value })}/><br/>
          <input style={{width: "180px"}} className="form-control" value={profile.email} onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })}/><br/>
          <select style={{width: "180px"}} className="form-control" onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })}><br/>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select><br/>
          <button className="btn btn-primary" onClick={() => save(profile)}>Save</button><br/><br/>
          <button className="btn btn-danger" onClick={signout}>Signout</button><br/><br/>
          <Link to="/Kanbas/Account/Admin/Users" style={{width: "180px"}} className="btn btn-warning">Get All Users</Link>
        </div>
      )}
    </div>
  );
}

