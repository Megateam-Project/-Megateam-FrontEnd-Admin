import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Form, Input, Select, Button, message } from "antd";
import baseApi from "./../../../shared/services/base.api";

const { Option } = Select;

export function Edit_User() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseApi.getDetailApi(`users/${userId}`);
        setUser(response);
        form.setFieldsValue(response);
      } catch (error) {
        message.error('Failed to fetch user details');
      }
    };
    fetchData();
  }, []);

  const onFinish = async (values) => {
    try {
      await baseApi.updateApi(`users/${userId}`, values);
      message.success('User updated successfully');
      navigate('/users');
    } catch (error) {
      message.error('Failed to update user');
    }
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
          form={form}
          className="rounded border border-danger-subtle w-50 p-3"
          initialValues={{
            name: user.name,
            email: user.email,
            role: user.role,
          }}
          onFinish={onFinish}
        >
          <h3 className="text-center mt-2 mb-4">Edit user</h3>
          <Form.Item
            label="User name"
            name="name"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            rules={[{ required: true, message: 'Please input the user name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select placeholder="Select">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
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
