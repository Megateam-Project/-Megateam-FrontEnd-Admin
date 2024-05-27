import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseApi from "../../../shared/services/base.api";
import DataTable from "react-data-table-component";
import {PlusOutlined, EditOutlined, DeleteFilled } from "@ant-design/icons";

export function IndexRoom() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await baseApi.getApi("rooms");
      setRooms(response);
    };
    fetchData();
  }, []);
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Room Name",
      selector: (row) => row.name,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Room Price",
      selector: (row) => row.price,
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.image}
          alt={row.name}
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      name: "Convenient",
      selector: (row) => row.convenient,
    },
    {
      name: "Room Number",
      selector: (row) => row.number,
    },
    {
      name: "Discount",
      selector: (row) => row.discount,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <Link
            to={`/rooms/edit/${row.id}`}
            className="mx-3 btn btn-warning btn-sm"
          >
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
    return data.map((room) => ({
      id: room.id,
      name: room.name,
      type: room.type,
      description: room.description,
      price: room.price,
      image: room.image,
      convenient: room.convenient,
      number: room.number,
      discount: room.discount,
    }));
  };
  const data = transformData(rooms);
  return (
    <div>
      <h2 className="m-3 title">MANAGE ROOM</h2>
      <h5>
        ADD ROOM{" "}
        <Link to="/rooms/create" className="mx-3 btn btn-success btn-sm">
          <PlusOutlined />
        </Link>
      </h5>
      <div className="tableBooking mt-3">
        <DataTable columns={columns} data={data} pagination />
      </div>
    </div>
  );
}

