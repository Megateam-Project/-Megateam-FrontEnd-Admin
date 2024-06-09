import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseApi from "../../../shared/services/base.api";
import DataTable from "react-data-table-component";
import { PlusOutlined, EditOutlined, DeleteFilled } from "@ant-design/icons";

export function IndexUser() {
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
      selector: (row) => row.name,
    },
    {
      name: "Avatar",
      cell: (row) => (
        <img
          src={row.avatar}
          alt={row.name}
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <Link
            to={`/users/edit/${row.id}`}
            className="mx-3 btn btn-warning btn-sm"
          >
            <EditOutlined />
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            className="btn btn-danger btn-sm"
          >
            <DeleteFilled />
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await baseApi.deleteApi(`Users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        alert("Error deleting user: " + err.message);
      }
    }
  };

  const transformData = (data) => {
    if(!data) return ''
    return data?.map((userInfo) => ({
      id: userInfo.id,
      name: userInfo.name,
      avatar: userInfo.avatar,
      email: userInfo.email,
      role: userInfo.role,
    }));
  };
  const data = transformData(users);
  return (
    <div>
      <h2 className="m-3 title">MANAGE USER</h2>
      <h5 style={{ marginLeft: 20 }}>
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
