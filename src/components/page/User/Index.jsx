import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import baseApi from "./../../../shared/services/base.api";
import DataTable from "react-data-table-component";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import PropTypes from 'prop-types';

export function Content_User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseApi.getApi("users");
        setUsers(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = useMemo(() => [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "User Name",
      selector: (row) => row.user.name,
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
  ], []);

  const transformData = (data) => {
    return data.map(user => ({
      id: user.id,
      user: {
        name: user.user.name,
        email: user.user.email,
        role: user.user.role,
      },
    }));
  };

  const data = useMemo(() => transformData(users), [users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="m-3 title">MANAGE USER</h2>
      <div className="tableUser mt-3">
        <DataTable columns={columns} data={data} pagination />
      </div>
    </div>
  );
}

Content_User.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }).isRequired,
  })),
};
