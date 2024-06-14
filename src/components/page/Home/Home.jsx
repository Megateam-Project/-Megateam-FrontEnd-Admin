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
         // Tính số lần đặt cho mỗi phòng
          console.log(bookingResponse);
         const roomBookings = bookingResponse.reduce((acc, booking) => {
           const roomId = booking.room_id;
           if (acc[roomId]) {
             acc[roomId].count += 1;
           } else {
             acc[roomId] = { room_id: roomId, count: 1 };
           }
           return acc;
         }, {});
           console.log(roomBookings);

         // Chuyển đổi object thành mảng và sắp xếp theo số lần đặt giảm dần
         const sortedRoomBookings = Object.values(roomBookings).sort(
           (a, b) => b.count - a.count
         );

         // Lấy 10 phòng được đặt nhiều nhất
         const top10Rooms = sortedRoomBookings
           .slice(0, 10)
           .map((roomBooking) => ({
             room_id: roomBooking.room_id,
             booking_count: roomBooking.count,
           }));
         setTopRooms(top10Rooms);
         console.log(topRooms);
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };
     fetchRoomCount();
   }, []);

  const data = [
    {
      name: "Room",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Room",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Room",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Room",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Room",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Room",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Room",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Room",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Room",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Room",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
          <div className="card-inner">
            <h3>ROOMS</h3>
            <FaBed className="card_icon" />
          </div>
          <h1>{roomCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{customerCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>BILLS</h3>
            <BsFileEarmarkTextFill className="card_icon" />
          </div>
          <h1>{billCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>TOTAL REVENUE</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h2>{totalRevenue} VND</h2>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
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
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
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
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
