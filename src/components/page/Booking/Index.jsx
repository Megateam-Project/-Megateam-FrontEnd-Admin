import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseApi from "./../../../shared/services/base.api";
import DataTable from "react-data-table-component";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
export function Content() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await baseApi.getApi("bookings");
      setBookings(response);
    };
    fetchData();
  }, []);
  const deleteBooking = async (id) => {
    const res = await baseApi.deleteApi(`bookings/${id}`);
    alert("Delete OK !!!");
    navigate("/bookings");
  };
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
          <Link
            to={`/bookings/edit/${row.id}`}
            className="mx-3 btn btn-warning btn-sm"
          >
            <EditOutlined />
          </Link>
          <button
            onClick={() => deleteBooking(row.id)}
            className="btn btn-danger btn-sm"
          >
            <DeleteFilled />
          </button>
        </div>
      ),
    },
  ];
  const transformData = (data) => {
    return data.map(booking => ({
      id: booking?.id,
      user: {
        name: booking?.user?.name,
        phone: booking?.user?.phone,
      },
      room: {
        number: booking?.room?.number,
        price: booking?.room?.price,
      },
      payment:{
        payment_method:booking?.payment?.payment_method,
      },
      check_in_date: booking?.check_in_date,
      check_out_date: booking?.check_out_date,
    }));
  };
  const data = transformData(bookings);
  return (
    <div>
      <h2 className="m-3 title">MANAGE BOOKING</h2>
      <div className="tableBooking mt-3">
        <DataTable columns={columns} data={data} pagination />
      </div>
    </div>
  );
}
