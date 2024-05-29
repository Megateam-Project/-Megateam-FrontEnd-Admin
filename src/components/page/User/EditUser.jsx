import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {  Form, Input, Select, Button } from "antd";
import baseApi from "./../../../shared/services/base.api";
export function Edit_User() {
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
  return (
    <div>
      <h2 className="mt-3 text-center title">MANAGE USER</h2>
      <div className="buttonBack m-3">
        <Link to="/users" className="btn btn-secondary mx-3">
          Back <ArrowLeftOutlined />
        </Link>
      </div>
      <div className="d-flex flex-column justify-content-between align-items-center">
        <form className="rounded border border-danger-subtle w-50 p-3">
          <h3 className="text-center mt-2 mb-4">Edit user</h3>
          <div>
            {userArr.map((user) => (
              <React.Fragment key={user.id}>
                <Form.Item
                  label="User name"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                  <Input defaultValue={user.user.name} />
                </Form.Item>
                <Form.Item
                  label="Email"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                  <Input defaultValue={user.user.email} />
                </Form.Item>
                <Form.Item
                  name="role"
                  label="Role"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
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
            <Link to="/users">
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
