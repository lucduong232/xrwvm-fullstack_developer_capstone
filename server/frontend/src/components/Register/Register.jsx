import React, { useState } from "react";
import "./Register.css";
import Header from "../Header/Header"; // Đảm bảo bạn có component Header

const Register = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin + "/djangoapp/register";

    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });

    const json = await res.json();
    if (json.status === "Authenticated") {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else {
      alert("Registration failed. Please check your details.");
    }
  };

  return (
    <div>
      <Header />
      <div className="register_container" style={{ width: "50%", margin: "auto", marginTop: "10%" }}>
        <div className="header_panel" style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="header_item" style={{ fontSize: "30px", fontWeight: "bold" }}>Sign-up</span>
          <a href="/" onClick={() => gohome()} style={{ textDecoration: "none" }}>
            <span style={{ fontSize: "30px", cursor: "pointer" }}>X</span>
          </a>
        </div>
        <hr />
        <form onSubmit={register}>
          <div className="input_group">
            {/* 1. Username */}
            <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} required />
          </div>
          <div className="input_group">
            {/* 2. First Name */}
            <input type="text" name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="input_group">
            {/* 3. Last Name */}
            <input type="text" name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="input_group">
            {/* 4. Email */}
            <input type="email" name="email" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input_group">
            {/* 5. Password */}
            <input type="password" name="psw" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="action_panel" style={{ marginTop: "20px" }}>
            <button className="register_button" type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
