import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseApi from "../../../shared/services/base.api";
import axios from "axios";
// import { Link } from "react-router-dom";
const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [create_by, setCreateBy] = useState("");
 
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const handlePhoneChange = (e) => {
    console.log(e.target.value);
    setPhone(e.target.value);
  };
  const handleRoleChange = (e) => {
    console.log(e.target.value);
    setRole(e.target.value);
  };
  const handleCreateByChange = (e) => {
    console.log(e.target.value);
    setCreateBy(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/users",{name,
        email,
        phone,
        password,
        role,
        create_by,})
      alert("Create successful");
      navigate("/users");
    } catch (error) {
      console.error("Create failed", error);
      alert("Create failed");
    }
  };
  return (
    <div className="mt-5 mb-5 mx-auto" style={{ maxWidth: "600px" }}>
      <form className="  mt-4 " onSubmit={handleSubmit}>
        <div className="container">
          <div className="mb-3 ">
            <label htmlFor="name" className="form-label">
              <b style={{ color: "#7C6A46" }}> Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className=" mt-2 form-control border-0 border-bottom border-black-1 border-dark  "
              name="name"
              id="name"
              value={name}
              required
              onChange={handleNameChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <b style={{ color: "#7C6A46" }}>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="mt-2 form-control border-0 border-bottom border-black-1 border-dark"
              name="email"
              id="email"
              value={email}
              required
              onChange={handleEmailChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              <b style={{ color: "#7C6A46" }}>Phone</b>
            </label>
            <input
              type="tel"
              placeholder="Enter Phone"
              className=" mt-2 form-control border-0 border-bottom border-black-1 border-dark"
              name="phone"
              id="phone"
              value={phone}
              required
              onChange={handlePhoneChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <b style={{ color: "#7C6A46" }}>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password "
              className=" mt-2 form-control border-0 border-bottom border-black-1 border-dark"
              name="password"
              minLength={8}
              id="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              <b style={{ color: "#7C6A46" }}>Role</b>
            </label>
            <select
              className=" mt-2 form-select border-0 border-bottom border-black-1 border-dark"
              name="role"
              id="role"
              required
              value={role}
              onChange={handleRoleChange}
              style={{ width: "100%" }}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="create_by" className="form-label">
              <b style={{ color: "#7C6A46" }}>Create By</b>
            </label>
            <select
              className=" mt-2 form-select border-0 border-bottom border-black-1 border-dark"
              name="create_by"
              id="create_by"
              required
              value={create_by}
              onChange={handleCreateByChange}
              style={{ width: "100%" }}
            >
              <option value="">Select Creator</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button
            type="submit"
            className=" mt-3 btn btn-dark w-100"
            style={{ backgroundColor: "#7C6A46", height: "45px" }}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
