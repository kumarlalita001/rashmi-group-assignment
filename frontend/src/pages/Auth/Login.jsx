import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!inputs?.email || !inputs?.password) {
      alert("Credentials can't be empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputs?.email,
          password: inputs?.password,
        }),
      });

      if (!response.ok) {
        // Handle error (e.g., incorrect credentials)
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        return;
      }

      const data = await response.json();
      // Save JWT token to localStorage
      localStorage.setItem("token", data.token);
      console.log("Login successful, token saved:", data.token);

      // Redirect user to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error during login:", error);
    }

    // signInWithEmailAndPassword(auth, inputs.email, inputs.password)
    //   .then((res) => {
    //     const user = res.user;

    //     if (user.emailVerified === true) {
    //       toast.success(" Login Successful 🔥", {
    //         position: "top-center",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //         transition: Bounce,
    //       });
    //       // 1. set the user
    //       setUser({ email: user.email, name: user.displayName });

    //       // 2. save in localStorage
    //       localStorage.setItem(
    //         "user",
    //         JSON.stringify({ email: user.email, name: user.displayName })
    //       );

    //       // 3. navigate to home
    //       setTimeout(() => {
    //         navigate("/room");
    //       }, 2500);
    //     } else {
    //       toast.error("Please Check mailBox and  Verify your email " + " 😔", {
    //         position: "top-center",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //         transition: Bounce,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err.message + " 😔", {
    //       position: "top-center",
    //       autoClose: 2000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //       transition: Bounce,
    //     });
    //   });
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <input
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          type="email"
          placeholder="Email*"
          className="w-full bg-inherit px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="mb-4">
        <input
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          type="password"
          placeholder="Password*"
          className="w-full px-4 bg-inherit py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-green-500  text-gray-900 font-bold  rounded-md"
      >
        Login
      </button>

      <h6 className="text-center mt-2 text-gray-300 underline underline-offset-4">
        <Link to={"register"}> Create New Account</Link>
      </h6>
    </form>
  );
};

export default Login;
