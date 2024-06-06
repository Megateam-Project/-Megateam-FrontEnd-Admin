import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Form, Button, Input, Select } from "antd";
import baseApi from "../../../shared/services/base.api";

export function EditUser() {
  const { Option } = Select;
  const { userId } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await baseApi.getDetailApi(`users/${userId}`);
      setUsers(response);
    };
    fetchData();
  }, [userId]);

  const userArr = Object.values(users);

  const handleFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h2 className="mt-3 text-center title">MANAGE USER</h2>
      <div className="buttonBack m-3">
        <Link to="/users" className="btn btn-secondary mx-3">
          Back <ArrowLeftOutlined />
        </Link>
      </div>
      <div className="d-flex flex-column justify-content-between align-items-center">
        <Form
          className="rounded border border-danger-subtle w-50 p-3"
          onFinish={handleFinish}
        >
          <h3 className="text-center mt-2 mb-4">Edit User</h3>
          <div>
            {userArr.map((userInfo) => (
              <React.Fragment key={userInfo.id}>
                <Form.Item
                  label="User name"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  name="user_name"
                  initialValue={userInfo.user.name}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="email"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  name="email"
                  initialValue={userInfo.user.email}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone number"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  name="phone_number"
                  initialValue={userInfo.user.phone}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="update_by"
                  label="Update By"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  initialValue={userInfo.update_by}
                >
                  <Select placeholder="select">
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                  </Select>
                </Form.Item>
              </React.Fragment>
            ))}
          </div>
          <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}