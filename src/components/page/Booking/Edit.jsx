import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { DatePicker, Form, Select, Button, message, Input } from "antd";
import baseApi from "./../../../shared/services/base.api";
import moment from "moment";
export function Edit() {
  const { Option } = Select;
  const { bookingId } = useParams();
  const [booking, setBookings] = useState([]);
  const [name, setUserName] = useState(null);
  const [number, setRoomNumber] = useState(null);
  const [check_in_date, setCheckInDate] = useState(null);
  const [check_out_date, setCheckOutDate] = useState(null);
  const [update_by, setUpdateBy] = useState(null);
  const [payments, setPayment] = useState([]);
  const [payment_method, setPaymentMethod] = useState(null);
  const [rooms, setRooms] = useState([]);
  // const navigate = useNavigate();
  useEffect(() => {
    getDetailBooking();
    getRooms();
    getPayments();
  }, []);
  const getDetailBooking = async () => {
    try {
      const response = await baseApi.getDetailApi(`bookings/${bookingId}`);
      setBookings(response.Booking);
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
      setPayment(response);
    } catch (error) {
      console.error("Error fetching payment:", error);
    }
  };
  const handleUserNameChange = (e) => {
    // console.log(e.target.value);
    setUserName(e.target.value);
  };
  const handleCheckInDateChange = (e) => {
    // console.log(e);
    setCheckInDate(e);
  };

  const handleCheckOutDateChange = (e) => {
    // console.log(e);
    setCheckOutDate(e);
  };
  const handleRoomChange = (e) => {
    // console.log(e);
    setRoomNumber(e);
  };
  const handleUpdateByChange = (e) => {
    // console.log(e);
    setUpdateBy(e);
  };
  const handlePaymentMethodChange = (e) => {
    // console.log(e);
    setPaymentMethod(e);
  };
  const updateBooking = async (e) => {
    console.log(name, number);
    e.preventDefault();
    try {
      const body = {
        user_id: name,
        room_id: number,
        check_in_date,
        check_out_date,
        update_by,
        payment_id: payment_method,
      };
      console.log(body);
      await baseApi.putApi(`bookings/${bookingId}`, body);
      message.success("Booking updated successfully");
      // navigate("/bookings");
    } catch (error) {
      message.error("Error updating booking");
      console.error("Error updating booking:", error);
    }
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
        <form
          className="rounded border border-danger-subtle w-50 p-3"
          onSubmit={updateBooking}
        >
          <h3 className="text-center mt-2 mb-4">Edit Booking</h3>
          <div>
            <React.Fragment key={booking?.id}>
              <Form.Item
                label="User name"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="user_id"
              >
                <Input
                  defaultValue={name ?? booking?.user?.name}
                  placeholder="Enter user name"
                  onChange={handleUserNameChange}
                />
              </Form.Item>
              <Form.Item
                label="Room Number"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="room_id"
              >
                <Select
                  defaultValue={number ?? booking?.room?.number}
                  placeholder="Select room"
                  onChange={handleRoomChange}
                >
                  {rooms.map((room) => (
                    <Option key={room.id} value={room.id}>
                      {room.number}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="check_in_date"
                label="Check in date"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  defaultValue={moment(check_in_date ?? booking?.check_in_date)}
                  onChange={handleCheckInDateChange}
                />
              </Form.Item>
              <Form.Item
                name="check_out_date"
                label="Check out date"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  defaultValue={moment(
                    check_out_date ?? booking?.check_out_date
                  )}
                  onChange={handleCheckOutDateChange}
                />
              </Form.Item>
              <Form.Item
                name="update_by"
                label="Update By"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <Select
                  placeholder="select"
                  defaultValue={update_by ?? booking?.update_by}
                  onChange={handleUpdateByChange}
                >
                  <Option value="admin">Admin</Option>
                  <Option value="user">User</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Payment"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="payment_id"
              >
                <Select
                  defaultValue={
                    booking?.payment_id
                  }
                  placeholder="Select payment method"
                  onChange={handlePaymentMethodChange}
                >
                  
                  {payments.map((payment) => (
                    <Option key={payment.id} value={payment.id}>
                      {payment.payment_method}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </React.Fragment>
          </div>
          <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
            <Link to="/bookings">
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Link>
          </Form.Item>
        </form>
      </div>
    </div>
  );
}
