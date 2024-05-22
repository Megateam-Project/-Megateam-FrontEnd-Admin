import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export function Content() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("X-API-Key", "{{token}}");
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        const response = await fetch(
          "http://127.0.0.1:8000/api/bookings",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="mt-3 text-center title">MANAGE BOOKING</h2>
      <div className="buttonAddBooking m-3">
        <Link to="/bookings/create">
          <button type="button" className="btn btn-success mx-3">
            Add Booking <i className="fa fa-plus"></i>
          </button>
        </Link>
      </div>
      <div className="tableBooking mt-3">
        <table className="mx-3 table table-striped">
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
                      to="/bookings/edit"
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
        </table>
      </div>
    </div>
  );
}
