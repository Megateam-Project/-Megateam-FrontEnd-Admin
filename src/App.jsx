import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Content } from "./components/page/Booking/Index";
import { Navbar } from "./components/layouts/Header";
import { Sidebar } from "./components/layouts/Sidebar";
import { Edit }  from './components/page/Booking/Edit';
import { Create } from './components/page/Booking/Create';
import { Content_User } from './components/page/User/Index';
import { Create_User } from './components/page/User/Create';
import { Edit_User } from './components/page/User/Edit';

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
                <Route path="/bookings/create" element={<Create />} />
                <Route path="/bookings/edit/:bookingId" element={<Edit />} />
                <Route path="/users" element={<Content_User/>} />
                <Route path="/users/create" element={<Create_User />} />
                <Route path="/users/edit/:userId" element={<Edit_User />} />
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
