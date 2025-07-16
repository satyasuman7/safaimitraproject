import React from 'react';
import './Error404.css'; // Minimal custom CSS
import { NavLink } from 'react-router-dom';

export default function Error404() {
  return (
    <div className="container bg-light text-center d-flex flex-column justify-content-center align-items-center my-5 py-5">
      <div className="face border border-dark rounded-3 bg-white position-relative my-4">
        <div className="band border border-dark rounded-2 position-absolute top-0 start-50 translate-middle-x mt-4">
          <div className="stripe red"></div>
          <div className="stripe white"></div>
          <div className="stripe blue"></div>
          <div className="overlay-left"></div>
          <div className="overlay-right"></div>
        </div>
        <div className="eyes"></div>
        <div className="dimples my-3"></div>
        <div className="mouth mx-auto"></div>
      </div>

      <h1 className="fw-bold text-dark display-5 px-3">Oops! Something went wrong!</h1>
      <button className="btn btn-primary btn-lg mt-4" >
        <NavLink to="/" className="text-white fs-6 text-decoration-none">Return to Home</NavLink>
      </button>
    </div>
  );
}
