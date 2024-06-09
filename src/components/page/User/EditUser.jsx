import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseApi from "../../../shared/services/base.api";
import axios from "axios";

export function EditUser() {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: null,
    role: "",
    update_by: "admin",
  });
  const [originalData, setOriginalData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await baseApi.getApi(`users/${userId}`);
        if (response) {
          setFormData({
            ...response,
            avatar: null,
          });
          setOriginalData(response);
        } else {
          setError("Failed to fetch user data. Please try again later.");
        }
      } catch (err) {
        setError("Failed to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchUser();
    } else {
      setError("User ID is not provided.");
    }
  }, [userId]);

  const handleFormDataChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedData = {};
      for (const key in formData) {
        if (formData[key] !== originalData[key] || key !== "avatar") {
          updatedData[key] = formData[key];
        } else {
          updatedData[key] = originalData[key];
        }
      }

      const formDataToSend = new FormData();
      for (const key in updatedData) {
        formDataToSend.append(key, updatedData[key]);
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${userId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        navigate("/users");
      } else {
        setError("Failed to update user. Please try again later.");
      }      
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mt-3 text-center title">MANAGE USER</h2>
      <div className="buttonBack m-3">
        <button
          onClick={() => navigate("/users")}
          className="btn btn-secondary mx-3"
        >
          Back
        </button>
      </div>
      <div className="d-flex flex-column justify-content-between align-items-center">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form
          className="rounded border border-danger-subtle w-50 p-3"
          onSubmit={handleUpdate}
        >
          <h3 className="text-center mt-2 mb-4">User Information</h3>
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
            <label htmlFor="email" className="form-label">
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
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleFormDataChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
            avatar
            </label>
            <input
              type="file"
              className="form-control"
              id="avatar"
              name="avatar"
              onChange={handleFormDataChange}
            />
          </div>
          
          {/* <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Avatar
            </label>
            <input
              type="file"
              className="form-control"
              id="avatar"
              name="avatar"
              onChange={handleFormDataChange}
            />
          </div> */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update User"}
          </button>
        </form>
      </div>
    </div>
  );
}
