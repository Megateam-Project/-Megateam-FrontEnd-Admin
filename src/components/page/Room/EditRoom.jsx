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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedData = new FormData();
      for (const key in formData) {
        if (formData[key] !== originalData[key] || key === "image") {
          updatedData.append(key, formData[key]);
        } else {
          updatedData.append(key, originalData[key]);
        }
      }
      updatedData.append("update_by", "admin");
      updatedData.append("_method", "PUT");

      const response = await axios.post(
        `http://127.0.0.1:8000/api/rooms/${roomId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleImageChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
