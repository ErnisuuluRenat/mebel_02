import React from "react";
import "./login.scss";
import { useMutation } from "react-query";
import axios from "axios";
import Navbar from "../../../components/Navbar/Navbar";

const login = async (formData) => {
  const response = await axios.post("http://46.8.43.42/auth/login", formData);
  return response.data;
};

const Login = () => {
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const { mutate, isLoading, isError, isSuccess } = useMutation(login);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="login__container">
        <h3>Login to your account</h3>
        <form onSubmit={handleSubmit}>
          <div className="login__input__container">
            <label className="label_form" htmlFor="email">
              Email
            </label>
            <input
              className="email_inp"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="login__input__container">
            <label className="label_form" htmlFor="password">
              Password
            </label>
            <input
              className="password_inp"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <button type="submit">Login</button>
          )}
          {isError && (
            <div>An error occurred while logging in. Please try again.</div>
          )}
          {isSuccess && <div>You have successfully logged in.</div>}
        </form>
      </div>
    </>
  );
};

export default Login;
