import React from "react";

import Navbar from "./Navbar";
import error from "../assets/error.jpg";

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <h1>Page Not Found</h1>
      <img src={error} alt="Pug wrapped in a blanket" />;
      <p>
        Photo by{" "}
        <a href="https://unsplash.com/@helloimnik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Nik
        </a>{" "}
        on <a href="https://unsplash.com/photos/LUYD2b7MNrg">Unsplash</a>
      </p>
    </div>
  );
};

export default NotFound;
