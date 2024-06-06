import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";


export function Create_User() {
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
          <h3 className="text-center mt-2 mb-4">ADD USER</h3>
          <Form.Item
            label="Name"
            labelCol={{ span: 4 }}  
            wrapperCol={{ span: 20 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Avatar"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
           <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
            <Link to="/users">
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Link>
          </Form.Item>
        </form>
      </div>
    </div>
  );
}
