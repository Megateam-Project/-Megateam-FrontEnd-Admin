import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Content } from "./components/page/Booking/Index";
import { Navbar } from "./components/layouts/Header";
import { Sidebar } from "./components/layouts/Sidebar";


import { Edit } from "./components/page/Booking/Edit";
import { IndexRoom } from "./components/page/Room/IndexRoom";
import { CreateRoomForm } from "./components/page/Room/CreateRoomForm";
import { EditRoom } from "./components/page/Room/EditRoom";
import { IndexUser } from "./components/page/User/IndexUser";
import { CreateUser } from "./components/page/User/CreateUser";
import { EditUser } from "./components/page/User/EditUser";
function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-10">
            <Navbar />
            <div className="row">
              <Routes>
                <Route path="/bookings" element={<Content />} />
                <Route path="/bookings/edit/:bookingId" element={<Edit />} />
                <Route path="/rooms" element={<IndexRoom />} />
                <Route path="/rooms/create" element={<CreateRoomForm />} />
                <Route path="/rooms/edit/:roomId" element={<EditRoom />} />
                <Route path="/users" element={<IndexUser/>} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/users/edit/:userId" element={<EditUser />} />
                {/* Add other routes here as needed */}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}


export default App;