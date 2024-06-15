import { useState, useEffect } from "react";
import { FaBed } from "react-icons/fa";
import {
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFileEarmarkTextFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import baseApi from "../../../shared/services/base.api";

function Home() {
  const [roomCount, setRoomCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [billCount, setBillCount] = useState(0);
  const [topRooms, setTopRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomCount = async () => {
      try {
        const roomResponse = await baseApi.getApi("rooms");
        const customerResponse = await baseApi.getApi("users");
        const billResponse = await baseApi.getApi("bills");
        const bookingResponse = await baseApi.getApi("bookings");

        setRoomCount(roomResponse.length);
        setCustomerCount(customerResponse.length);
        setBillCount(billResponse.length);

        const totalRevenue = billResponse.reduce(
          (acc, bill) => acc + parseFloat(bill.total_price),
          0
        );
        setTotalRevenue(totalRevenue);
        const roomBookings = bookingResponse.reduce((acc, booking) => {
          const roomId = booking.room_id;
          if (acc[roomId]) {
            acc[roomId].count += 1;
          } else {
            const room = roomResponse.find((room) => room.id === roomId);
            acc[roomId] = {
              room_id: roomId,
              room_number: room ? room.number : "Unknown",
              count: 1,
            };
          }
          return acc;
        }, {});

        const sortedRoomBookings = Object.values(roomBookings).sort(
          (a, b) => b.count - a.count
        );

        // Lấy 5 phòng được đặt nhiều nhất
        const top5Rooms = sortedRoomBookings.slice(0, 5).map((roomBooking) => ({
          room_number: roomBooking.room_number,
          booking_count: roomBooking.count,
        }));

        setTopRooms(top5Rooms);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomCount();
  }, []);

  const data = topRooms.map((room) => ({
    name: `Room ${room.room_number}`,
    booking_count: room.booking_count,
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner p-2" >
            <h3>ROOMS</h3>
            <FaBed className="card_icon" />
          </div>
          <h2 className="p-2">{roomCount}</h2>
        </div>
        <div className="card">
          <div className="card-inner p-2" >
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h2 className="p-2">{customerCount}</h2>
        </div>
        <div className="card">
          <div className="card-inner p-2" >
            <h3>BILLS</h3>
            <BsFileEarmarkTextFill className="card_icon" />
          </div>
          <h2 className="p-2">{billCount}</h2>
        </div>
        <div className="card">
          <div className="card-inner p-2" >
            <h3>TOTAL REVENUE</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h2 className="p-2">{totalRevenue} VND</h2>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="booking_count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="booking_count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
