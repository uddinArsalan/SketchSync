import React, { useContext, useState } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import LoginImg from "../assets/mainImg/login.jpg";
import "../CSS/style.css";
import Footer from "./Footer";
import navLogo from "../assets/logo/navLogo.png";
import { Link,useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const { signUpUser, isError, errorMsg, loginUser } =
    useContext(FirebaseContext);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate()
  // const [formState, setFormState] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const signup = (event: React.FormEvent): void => {
    event.preventDefault();
    signUpUser(formik.values.email, formik.values.password);
    // setFormState((prev) => {
    //   return{
    //     name : "",
    //     email : "",
    //     password : ""
    //   }
    // })
    (formik.errors.email == undefined && formik.errors.password == undefined && formik.errors.name == undefined)  ? navigate("/") : null;
    // formik.values.name = "";
    // formik.values.email = "";
    // formik.values.password = "";
  };

  const login = (event: React.FormEvent): void => {
    event.preventDefault();
    loginUser(formik.values.email, formik.values.password);
    (formik.errors.email == "" && formik.errors.password == "" && formik.errors.name == "")  ? navigate("/") : null
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   const { name, value } = event.target;
  //   setFormState((prevState) => {
  //     return {
  //       ...prevState,
  //       [name]: value,
  //     };
  //   });
  // };

  return (
    <>
      <div className="loginContainer">
        <div>
          <img src={LoginImg} alt="" className="loginImg" />
        </div>
        <div className="formContainer">
          <Link to="/">
            <div className="position">
              <img
                src={navLogo}
                alt=""
                className="navLogo"
                style={{ width: "60%" }}
              />
            </div>
          </Link>
          <h1 className="signUp__heading">Sign Up/Login</h1>
          <div className="loginFormLink">
            Already Registered ?{" "}
            <span
              className="login"
              onClick={() => {
                setIsLogin(true);
                formik.values.name = "";
                formik.values.email = "";
                formik.values.password = "";
              }}
            >
              Login Here{" "}
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {isError && (
              <div className="error">{errorMsg.substring(10, 50)}</div>
            )}
            <div>
              <h1
                style={{
                  color: "#f2af04",
                  fontSize: "3.3rem",
                  padding: "0.35em",
                  paddingLeft: 0,
                }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </h1>
            </div>
            {!isLogin ? (
              <div>
                {(formik.touched.name && formik.errors.name) && (!isLogin) ? (
                  <div className="error">{formik.errors.name}</div>
                ) : null}
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  // onChange={handleChange}
                  // value={formState.name}
                />
              </div>
            ) : (
              ""
            )}
            <div>
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                // onChange={handleChange}
                // value={formState.email}
              />
            </div>
            <div>
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                // onChange={handleChange}
                // value={formState.password}
              />
            </div>
            <div>
              {!isLogin ? (
                <button onClick={signup} className="submit">
                  SignUp
                </button>
              ) : (
                <button onClick={login} className="submit">
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
