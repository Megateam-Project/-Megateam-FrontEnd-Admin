// import React from 'react';
import UserAvatar from "../../assets/UserAvatar.png";
import logoAdmin from "../../assets/logoAdmin.png";
export function Sidebar() {
  return (
    <div className="col-2">
      <div className="sidebar p-2">
        <a href="">
          <img className="m-3" src={logoAdmin} style={{ width: "200px" }} alt="logo"/>
        </a>
        <div className="d-flex mt-3 mb-5">
          <img src={UserAvatar} className="flex-shrink-0 m-2 rounded-circle w-25" alt="Profile"/>
          <div className="d-flex flex-column px-3 align-self-center">
            <div className="text-sm text-dark">Manuel </div>
            <div className="mt-1 text-xs text-secondary">Manuel@email.com</div>
          </div>
        </div>
        <ul className="mt-4">
        <li style={{ listStyleType: "none" }} className="mt-4">
            <a href="/home" style={{ fontSize: "18px" }} className="text-decoration-none text-black" >
              Dashboard
            </a>
          </li>
          <li style={{ listStyleType: "none" }} className="mt-4">
            <a href="/users" style={{ fontSize: "18px" }} className="text-decoration-none text-black" >
              Manage Users
            </a>
          </li>
          <li style={{ listStyleType: "none" }} className="mt-4">
            <a href="/bookings" style={{ fontSize: "18px" }} className="text-decoration-none text-black">
              Manage Booking
            </a>
          </li>
          <li style={{ listStyleType: "none" }} className="mt-4">
            <a href="/rooms" style={{ fontSize: "18px" }} className="text-decoration-none text-black" >
              Manage Room
            </a>
          </li>
          <li style={{ listStyleType: "none" }} className="mt-4">
            <a href="#" style={{ fontSize: "18px" }} className="text-decoration-none text-black">
              Chart
            </a>
          </li>
          <li style={{ listStyleType: "none" }} className="mt-4">
            <a href="#" style={{ fontSize: "18px" }} className="text-decoration-none text-black">
              Profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
