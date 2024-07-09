import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleClick = () => {
    console.log(registerData.name);
    axios
      .post("api/register", {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        role: "user",
      })
      .then((res) => {
        alert("Uspesno kreiran nalog.");
        navigate("/");
      })
      .catch((e) => {
        // Ukoliko nije, postavi isFormValid na false
        alert(e);
      });
  };
  return (
    <div className="container">
      <h1>Registration</h1>
      <label>Name</label>
      <input
        type="text"
        onChange={(e) =>
          setRegisterData({ ...registerData, name: e.target.value })
        }
      />
      <label>Email</label>
      <input
        type="text"
        onChange={(e) =>
          setRegisterData({ ...registerData, email: e.target.value })
        }
      />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) =>
          setRegisterData({ ...registerData, password: e.target.value })
        }
      />
      <button
        type="button"
        class="btn btn-primary"
        onClick={handleClick}
        style={{
          margin: "30px 0",
          height: "60px",
          width: "100px",
          fontSize: "24px",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Register;
