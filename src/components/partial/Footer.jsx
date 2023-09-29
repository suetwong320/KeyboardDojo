import "../../App.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <section className="">
      <footer className="text-center text-white">
        <div className="container p-4 pb-0">
          <section className="">
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3">Register for free</span>
              <button
                type="button"
                className="btn btn-outline-light btn-rounded"
              >
                Sign up!
              </button>
            </p>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2020 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            keyboardDojo.com
          </a>
        </div>
      </footer>
    </section>
  );
}

export default Footer;
