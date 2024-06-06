import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseApi from "../../../shared/services/base.api";
import axios from "axios";

export function EditRoom() {
  const { roomId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    price: "",
    image: null,
    convenient: "",
    number: "",
    discount: "",
    update_by: "admin",
  });
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      try {
        const response = await baseApi.getApi(`rooms/${roomId}`);
        if (response) {
          setFormData({
            ...response,
            image: null,
          });
          setOriginalData(response);
        } else {
          setError("Failed to fetch room data. Please try again later.");
        }
      } catch (err) {
        setError("Failed to fetch room data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (roomId) {
      fetchRoom();
    } else {
      setError("Room ID is not provided.");
    }
  }, [roomId]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedData = {};
      for (const key in formData) {
        if (formData[key] !== originalData[key] || key !== "image") {
          updatedData[key] = formData[key];
        } else {
          updatedData[key] = originalData[key];
        }
      }
      // var object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });
      // var json = JSON.stringify(object);
      console.log(formData);
      formData["update_by"] = "admin"
      const response = await axios.put(
        `http://127.0.0.1:8000/api/rooms/${roomId}`,
        formData
      );
      // const response = await axios.put

      if (response) {
        navigate("/rooms");
      } else {
        setError("Failed to update room. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      setError("Failed to update room. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mt-3 text-center title">Edit Room</h2>
      <div className="buttonBack m-3">
        <button
          onClick={() => navigate("/rooms")}
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
          <h3 className="text-center mt-2 mb-4">Room Details</h3>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Room Name
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
              Room Type
            </label>
            <input
              type="text"
              className="form-control"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleFormDataChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleFormDataChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleFormDataChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleFormDataChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="convenient" className="form-label">
              Convenient
            </label>
            <input
              type="text"
              className="form-control"
              id="convenient"
              name="convenient"
              value={formData.convenient}
              onChange={handleFormDataChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Number
            </label>
            <input
              type="text"
              className="form-control"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleFormDataChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="discount" className="form-label">
              Discount
            </label>
            <input
              type="text"
              className="form-control"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleFormDataChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Room"}
          </button>
        </form>
      </div>
    </div>
  );
}
