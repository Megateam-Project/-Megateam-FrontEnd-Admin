import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseApi from "./../../../shared/services/base.api";
import DataTable from "react-data-table-component";
import {PlusOutlined, EditOutlined, DeleteFilled } from "@ant-design/icons";

export function Content_User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await baseApi.getApi("users");
      setUsers(response);
    };
    fetchData();
  }, []);
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "User Name",
      selector: (row) => row.user.name,
     
    },
    {
      name: "Avata",
      cell: (row) => (
        <img
          src={row.user.image}
          alt={row.user.name}
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      name: "Email",
      selector: (row) => row.user.email,
    },
    {
      name: "Role",
      selector: (row) => row.user.role,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <Link to={`/users/edit/${row.id}`} className="mx-3 btn btn-warning btn-sm">
            <EditOutlined />
          </Link>
          <Link to="/delete" className="btn btn-danger btn-sm">
          <DeleteFilled />
          </Link>
        </div>
      ),
    },
  ];
  const transformData = (data) => {
    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.image,
      role: user.role,
    }));
  };
  const data = transformData(users);
  return (
    <div>
      <h2 className="m-3 title">MANAGE USER</h2>
        <h5 style={{ marginLeft: '20px' }}>
          ADD USER{" "}
          <Link to="/users/create" className="mx-3 btn btn-success btn-sm">
            <PlusOutlined />
          </Link>
        </h5>
      <div className="tableBooking mt-3">
      <DataTable columns={columns} data={data} pagination />
      </div>
    </div>
  );
}
