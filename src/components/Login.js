import React from "react";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" placeholder="johnsmith" />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Enter Password Here"
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
