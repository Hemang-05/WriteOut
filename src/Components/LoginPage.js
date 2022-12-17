import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  let navigate = useNavigate();

  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
        console.log(json.token_)
      localStorage.setItem("token", json.token_);

      navigate("/");
      alert("Logged In");
    } else {
      alert("Invalid Credentials");
    }
  };

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form className="container my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
            <h2>Log In</h2>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            onChange={onchange}
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onchange}
            name="password"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
