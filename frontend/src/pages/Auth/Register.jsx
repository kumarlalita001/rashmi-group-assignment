import React, { useRef, useState } from "react";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !usernameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value
    ) {
      alert("Credentials can't be empty");
      return;
    }

    console.log(
      usernameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      if (!response.ok) {
        // Handle error
        const errorData = await response.json();
        console.error("Signup failed:", errorData.message);
        return;
      }

      const data = await response.json();

      console.log("Register Data :", data);
      // Save JWT token to localStorage
      localStorage.setItem("token", data.token);
      console.log("Signup successful, token saved:", data.token);
      alert("Success");

      // Redirect user or update UI
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  // createUserWithEmailAndPassword(
  //   auth,
  //   emailRef.current.value,
  //   passwordRef.current.value
  // )
  //   .then((res) => {
  //     const user = res.user;

  //     sendEmailVerification(user, { url: "https://cross-wins.web.app" })
  //       .then((res) => {
  //         toast.success("Email sent!!! Please verify your email 🔥", {
  //           position: "top-center",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //           transition: Bounce,
  //         });
  //       })
  //       .catch((err) => {
  //         toast.error(err.message + " 😉", {
  //           position: "top-center",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //           transition: Bounce,
  //         });
  //       });
  //   })
  //   .catch((err) => {
  //     toast.error(err.message, {
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
  //   };

  return (
    <form onSubmit={handleRegister}>
      <div className="mb-4">
        <input
          ref={usernameRef}
          type="text"
          placeholder="FullName*"
          className="w-full px-4 py-2 bg-inherit border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="mb-4">
        <input
          ref={emailRef}
          type="email"
          placeholder="Email*"
          className="w-full px-4 py-2 border bg-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="mb-4">
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password*"
          className="w-full px-4 py-2 border bg-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-green-500  text-gray-900 font-bold  rounded-md"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
