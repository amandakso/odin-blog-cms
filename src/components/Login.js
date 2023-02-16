import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://odin-blog-api.onrender.com/blog/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      let resJson = await res.json();

      if (res.status === 200) {
        if (resJson.error) {
          setError(resJson.error);
        }
        if (resJson.message) {
          alert(resJson.message);
        }
        if (resJson.token) {
          setUsername("");
          setPassword("");
          setError(null);
          sessionStorage.setItem("token", resJson.token);
          alert(`Welcome ${resJson.username}!`);
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={username}
              placeholder="johnsmith"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              value={password}
              placeholder="Enter Password Here"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button" onClick={(e) => loginUser(e)}>
              Login
            </button>
          </div>
        </div>
      </form>
      {error ? <p>{error}</p> : null}
      <div>
        Don't have an account? Sign up <Link to={"/signup"}>HERE</Link>
      </div>
    </div>
  );
};

export default Login;
