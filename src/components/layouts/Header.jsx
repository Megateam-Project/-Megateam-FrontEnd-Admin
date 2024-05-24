// import React from 'react';
export function Navbar() {
  return (
    <div className="d-flex flex-column justify-content-start align-items-center mx-auto">
      <div className="navbar d-flex justify-content-between align-items-center">
        <div className="search mx-5">
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
      </div>
    </div>
  );
}
