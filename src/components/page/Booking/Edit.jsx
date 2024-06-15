import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import baseApi from "./../../../shared/services/base.api";
import moment from "moment";
import axios from "axios";
import { message } from "antd";

export function Edit() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState({});
  const [rooms, setRooms] = useState([]);
  const [payments, setPayments] = useState([]);
  const [formState, setFormState] = useState({
    room_id: null,
    check_in_date: null,
    check_out_date: null,
    update_by: null,
    payment_id: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    getDetailBooking();
    getRooms();
    getPayments();
  }, []);

  const getDetailBooking = async () => {
    try {
      const response = await baseApi.getDetailApi(`bookings/${bookingId}`);
      setBooking(response.Booking);
      setFormState({
        room_id: response.Booking.room?.id || "",
        check_in_date: response.Booking.check_in_date ? moment(response.Booking.check_in_date).format("YYYY-MM-DDTHH:mm") : "",
        check_out_date: response.Booking.check_out_date ? moment(response.Booking.check_out_date).format("YYYY-MM-DDTHH:mm") : "",
        update_by: response.Booking.update_by || "",
        payment_id: response.Booking.payment_id || ""
      });
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const getRooms = async () => {
    try {
      const response = await baseApi.getApi("rooms");
      setRooms(response);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const getPayments = async () => {
    try {
      const response = await baseApi.getApi("payments");
      setPayments(response);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateBooking = async (event) => {
    event.preventDefault();
    const body = {
      room_id: formState.room_id || booking.room_id,
      check_in_date: formState.check_in_date || booking.check_in_date,
      check_out_date: formState.check_out_date || booking.check_out_date,
      update_by: formState.update_by || booking.update_by,
      payment_id: formState.payment_id || booking.payment_id,
    };

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/bookings/${bookingId}`, body);
      if (response.status === 200) {
        message.success("Booking updated successfully");
        navigate("/bookings");
      } else {
        message.error("Error updating booking");
      }
    } catch (error) {
      message.error("Error updating booking");
    }
  };

  const renderRoomOptions = () => {
    return rooms.sort((a, b) => a.number - b.number).map((room) => (
      <option key={room.id} value={room.id}>
        {room.number}
      </option>
    ));
  };

  const renderPaymentOptions = () => {
    return payments.map((payment) => (
      <option key={payment.id} value={payment.id}>
        {payment.payment_method}
      </option>
    ));
  };

  return (
    <div>
      <h2 className="mt-3 text-center title">MANAGE BOOKING</h2>
      <div className="buttonBack m-3">
        <Link to="/bookings" className="btn btn-secondary mx-3">
          Back <ArrowLeftOutlined />
        </Link>
      </div>
      <div className="d-flex flex-column justify-content-between align-items-center">
        <form className="rounded border border-danger-subtle w-50 p-3" onSubmit={handleUpdateBooking}>
          <h3 className="text-center mt-2 mb-4">Edit Booking</h3>
          <div>
            <div className="form-group mb-3">
              <label htmlFor="room_id" className="mb-3">Room Number</label>
              <select
                className="form-control"
                name="room_id"
                value={formState.room_id}
                onChange={handleInputChange}
              >
                <option value="">Select room</option>
                {renderRoomOptions()}
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="check_in_date" className="mb-3">Check in date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="check_in_date"
                value={formState.check_in_date}
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DDTHH:mm")}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="check_out_date" className="mb-3">Check out date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="check_out_date"
                value={formState.check_out_date}
                onChange={handleInputChange}
                min={formState.check_in_date || moment().format("YYYY-MM-DDTHH:mm")}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="update_by" className="mb-3">Update By</label>
              <select
                className="form-control"
                name="update_by"
                value={formState.update_by}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="payment_id" className="mb-3">Payment</label>
              <select
                className="form-control"
                name="payment_id"
                value={formState.payment_id}
                onChange={handleInputChange}
              >
                <option value="">Select payment method</option>
                {renderPaymentOptions()}
              </select>
            </div>
          </div>
          <div className="form-group text-center">
            <button type="submit" className="" style={{backgroundColor: "#7C6A46", color:"white"}}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
