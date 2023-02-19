import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const toggleBurgerMenu = () => {
    document.querySelector(".navbar-menu").classList.toggle("is-active");
    document.querySelector(".navbar-burger").classList.toggle("is-active");
  };

  const navigate = useNavigate();

  const logoutUser = async () => {
    let token = sessionStorage.getItem("token");
    try {
      let res = await fetch("https://odin-blog-api.onrender.com/blog/logout", {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      let resJson = await res.json();
      sessionStorage.removeItem("token");
      sessionStorage.clear();
      alert(resJson.msg);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar" role="navigation" aria-label="dropdown navigation">
      <div className="navbar-brand">
        <button className="navbar-item">CMS</button>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenuItems"
          onClick={toggleBurgerMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarMenuItems" className="navbar-menu">
        <div className="navbar-start">
          <Link to={"/"} className="navbar-item">
            Home
          </Link>
        </div>
        <div className="navbar-end">
          <Link to={"/create"} className="navbar-item">
            Create Post
          </Link>
          <div className="navbar-item">
            <button className="button" onClick={() => logoutUser()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
