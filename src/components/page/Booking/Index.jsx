import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseApi from "./../../../shared/services/base.api";
import DataTable from "react-data-table-component";
import {EditOutlined, DeleteFilled} from "@ant-design/icons";

export function Content() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await baseApi.getApi("bookings");
      setBookings(response);
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
      name: "Phone",
      selector: (row) => row.user.phone,
    },
    {
      name: "Room Number",
      selector: (row) => row.room.number,
      sortable: true,
    },
    {
      name: "Room Price",
      selector: (row) => row.room.price,
    },
    {
      name: "Check in date",
      selector: (row) => row.check_in_date,
    },
    {
      name: "Check out date",
      selector: (row) => row.check_out_date,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <Link to={`/bookings/edit/${row.id}`} className="mx-3 btn btn-warning btn-sm">
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
    return data.map(booking => ({
      id: booking.id,
      user: {
        name: booking.user.name,
        phone: booking.user.phone,
      },
      room: {
        number: booking.room.number,
        price: booking.room.price,
      },
      check_in_date: booking.check_in_date,
      check_out_date: booking.check_out_date,
    }));
  };
  const data = transformData(bookings);
  return (
    <div>
      <h2 className="m-3 title">MANAGE BOOKING</h2>
      <div className="tableBooking mt-3">
      <DataTable columns={columns} data={data} pagination />

        {/* <table className="mx-3 table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Room Number</th>
              <th scope="col">Room Price</th>
              <th scope="col">Check in date</th>
              <th scope="col">Check out date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.user.name}</td>
                <td>{booking.user.phone}</td>
                <td>{booking.room.number}</td>
                <td>{booking.room.price}</td>
                <td>{booking.check_in_date}</td>
                <td>{booking.check_out_date}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      to={`/bookings/edit/${booking.id}`}
                      className="mx-3 btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>
                    <Link to="/delete" className="btn btn-danger btn-sm">
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}
