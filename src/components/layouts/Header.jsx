import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in cookies when the component mounts
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const logOutUser = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="d-flex flex-column justify-content-start align-items-center mx-auto">
      <div className="navbar d-flex justify-content-between align-items-center">
        {isLoggedIn && (
          <div className="search mx-5" style={{ marginLeft: "200px" }}>
            <form className="d-inline-flex position-relative" role="search">
              <button
                type="submit"
                className="btn position-absolute start-0 top-0 bottom-0"
                id="search-addon"
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
              <input
                type="search"
                className="form-control rounded-pill"
                placeholder="Search here..."
                aria-label="Search"
                aria-describedby="search-addon"
              />
            </form>
          </div>
        )}
        <div>
          {!isLoggedIn ? (
            <Link to="/login" className="nav-link fs-5">
              {/* <button
                className="btn"
                style={{ backgroundColor: "#7C6A46", color: "white" }}
              >
                Login
              </button> */}
            </Link>
          ) : (
            <button
              onClick={logOutUser}
              className="btn"
              style={{ backgroundColor: "#7C6A46", color: "white",  marginLeft: "100px"  }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
