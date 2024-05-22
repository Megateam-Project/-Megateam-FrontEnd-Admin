// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Select, Button } from "antd";

export function Edit() {
  const { Option } = Select;
  return (
    <div>
      <h2 className="mt-3 text-center title">MANAGE BOOKING</h2>
      <div className="buttonBack m-3">
        <Link to="/bookings" className="btn btn-secondary mx-3">
          Back <ArrowLeftOutlined />
        </Link>
      </div>
      <div className="d-flex flex-column justify-content-between align-items-center">
        <form className="rounded border border-danger-subtle w-50 p-3">
          <h3 className="text-center mt-2 mb-4">Edit Booking</h3>
          <Form.Item
            label="User name"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone number"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Room number"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="check_in_date"
            label="Check in date"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
            name="check_out_date"
            label="Check out date"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
            name="update_by"
            label="Update By"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Select placeholder="select ">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
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
