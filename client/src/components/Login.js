import React, { useState } from "react";
import { axiosWithAuth } from "../Auth/axiosAuth";

const Login = (props) => {
  const [newLogin, setNewLogin] = useState({
    credentials: {
      username: "",
      password: "",
    },
  });

  // handle change baby!

  const handleChange = (event) => {
    setNewLogin({
      ...newLogin,
      [event.target.name]: event.target.value,
    });
  };

  //handle submit!

  const submit = (event) => {
    event.preventDefault();

    axiosWithAuth()
      .post("/api/login", newLogin)
      .then((res) => {
        console.log({ res });
        localStorage.setItem("token", JSON.stringify(res.data.payload));
        props.history.push("/BubblePage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input
          placeholder="User- Name"
          type="text"
          name="username"
          onChange={handleChange}
        />
        <br></br>
        <input
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
