import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Content } from "./components/page/Booking/Index";
import { Navbar } from "./components/layouts/Header";
import { Sidebar } from "./components/layouts/Sidebar";

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
                <Route path="/" element={<Content />} />
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
