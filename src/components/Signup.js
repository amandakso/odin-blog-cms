import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [errors, setErrors] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const createAdmin = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://odin-blog-api.onrender.com/blog/sign-up", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          password_confirmation: confirmation,
          author: true,
        }),
      });
      let resJson = await res.json();

      if (res.status === 200) {
        if (resJson.error) {
          setError(resJson.error);
        }
        if (resJson.errors) {
          setErrors(resJson.errors);
        }
        if (resJson.message) {
          setUsername("");
          setPassword("");
          setConfirmation("");
          setError(null);
          setErrors(null);
          alert(resJson.message);
          navigate("/");
        }
      } else {
        console.log("error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container pt-5 mx-5 px-5">
      <h1 className="title">Sign Up</h1>
      <form>
        <div className="field">
          <div className="label">Username</div>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="e.g. johnsmith"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div className="label">Password</div>
          <div className="control">
            <input
              className="input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div className="label">Password Confirmation</div>
          <div className="control">
            <input
              className="input"
              type="password"
              onChange={(e) => setConfirmation(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button" onClick={(e) => createAdmin(e)}>
              Sign Up
            </button>
          </div>
        </div>
      </form>
      {error ? <p>{error}</p> : null}
      {errors ? (
        <ul>
          {errors.map((item, index) => (
            <li key={index}>{item.msg}</li>
          ))}
        </ul>
      ) : null}
      <div>
        Already have an account? Click <Link to={"/login"}>HERE</Link> to log
        in.
      </div>
    </div>
  );
};

export default Signup;
