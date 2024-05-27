import { useState } from "react";
import baseApi from "../../../shared/services/base.api";
import { Link, useNavigate } from "react-router-dom";

export function CreateRoomForm() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    price: "",
    image: null, // Sửa đổi từ string thành null để lưu trữ file
    convenient: "",
    number: "",
    discount: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormDataChange = (e) => {
    const { name, value, files } = e.target;

    // Nếu trường là một trường file, lưu trữ tệp vào formData
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Lưu trữ tệp đầu tiên trong danh sách các tệp được chọn
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
      // Tạo FormData object để gửi dữ liệu có chứa cả tệp hình ảnh
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Gửi yêu cầu tạo phòng mới lên server
      await baseApi.postApi("rooms", formDataToSend);

      // Chuyển hướng về trang danh sách phòng sau khi tạo thành công
      navigate("/rooms");
    } catch (error) {
      console.error("Error creating room:", error);
      setError("Failed to create room. Please try again later.");
    }
  };

  return (
    <div>
      <h2 className="mt-3 text-center title">Create New Room</h2>
      <div className="buttonBack m-3">
        <Link to="/rooms" className="btn btn-secondary mx-3">
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
              type="file" // Sử dụng kiểu file để cho phép tải lên tệp
              className="form-control"
              id="image"
              name="image"
              onChange={handleFormDataChange}
              required
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
          <button type="submit" className="btn btn-primary">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}
