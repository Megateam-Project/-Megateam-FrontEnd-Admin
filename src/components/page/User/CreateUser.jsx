import { useState } from "react";
import baseApi from "../../../shared/services/base.api";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../shared/constants/constants.js";

export function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    image: null,
    create_by: "admin",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormDataChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (formData.image) {
        formDataToSend.append("image", formData.image);
        const imageUrl = URL.createObjectURL(formData.image);
        setFormData((prevData) => ({
          ...prevData,
          image: imageUrl,
        }));
      }
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      await baseApi.postApi(BASE_URL + "users", formDataToSend);
      console.log(formData);
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user. Please try again later.");
    }
  };
  return (
    <div>
      <h2 className="mt-3 text-center title">Create New User</h2>
      <div className="buttonBack m-3">
        <Link to="/users" className="btn btn-secondary mx-3">
          Back
        </Link>
      </div>
      <div className="d-flex flex-column justify-content-between align-items-center">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form
          className="rounded border border-danger-subtle w-50 p-3"
          onSubmit={handleCreate}
        >
          <h3 className="text-center mt-2 mb-4">User information</h3>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormDataChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormDataChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Phone number
            </label>
            <textarea
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleFormDataChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Role
            </label>
            <input
              type="text"
              className="form-control"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleFormDataChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Avatar
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleFormDataChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
