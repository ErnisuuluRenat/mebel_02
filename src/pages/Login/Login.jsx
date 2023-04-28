import React from "react";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/thunk/loginThunk";
import { logout } from "../../redux/thunk/loginThunk";

// const login = async (formData) => {
//   const response = axios.post("http://46.8.43.42:8080/auth/registration", formData);
//   return response.data;
// };

const authSelector = (state) => state.auth;

const Login = () => {
  // const [formData, setFormData] = React.useState({ username: "", password: "" });
  // const { mutate, isLoading, isError, isSuccess } = useMutation(login);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   mutate(formData);
  // };


  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({ username: "", password: "" });

  const { isLoading, isError, isSuccess, isAuthenticated, userRole,user } = useSelector(authSelector);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
  }

  return (
    <>
      <div className="login__container">
      {isAuthenticated ? (
          <>
            <div className="logout">You are logged in.</div>
            <button onClick={(e) => handleLogout(e)}>Logout</button>

            {}
          </>
        ) : (<><h3>Login to your account</h3>
        <form onSubmit={handleSubmit}>
          <div className="login__input__container">
            <label className="label_form" htmlFor="email">
              username
            </label>
            <input
              className="email_inp"
              type="text"
              id="username"
              name="username"
              value={formData.username}
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
            <div className="loading">Loading...</div>
          ) : (
            <button type="submit">Login</button>
          )}
          {isError && (
            <div className="error">An error occurred while logging in. Please try again.</div>
          )}
          {isSuccess && <div className="success">You have successfully logged in.</div>}
        </form></>)
          
      }
      </div>
    </>
    
  );
};

export default Login;
