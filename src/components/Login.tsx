import React, { useState } from "react";
import { useFirebase } from "../context/FirebaseContext";
import LoginImg from "../assets/mainImg/login.jpg";
import "../CSS/login.css";
import Footer from "./Footer";
import navLogo from "../assets/logo/navLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login: React.FC = () => {
  const { signUpUser, loginUser, isError, errorMsg } = useFirebase();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    // when('isLogin', {
    //   is: false,
    //   then: Yup.string().required('Required').max(15, 'Must be 15 characters or less'),
    // }
    // Yup.string().required('Required').max(15, 'Must be 15 characters or less')
    validationSchema: Yup.object({
      name: Yup.string().required('Required').max(15, 'Must be 15 characters or less'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        if (isLogin) {
           loginUser(values.email, values.password);
        } else {
           signUpUser(values.email, values.password);
        }
        navigate('/');
      } catch (error) {
        console.error('Authentication error:', error);
      }
    },
  });

  const toggleLoginMode = () => {
    setIsLogin(!isLogin);
    formik.resetForm();
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__image-container">
          <img src={LoginImg} alt="Login" className="login__image" />
        </div>
        <div className="login__form-container">
          <Link to="/" className="login__logo-link">
            <img src={navLogo} alt="SketchSync Logo" className="login__logo" />
          </Link>
          <h1 className="login__heading">{isLogin ? 'Welcome Back' : 'Join SketchSync'}</h1>
          <p className="login__toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" className="login__toggle-button" onClick={toggleLoginMode}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
          <form onSubmit={formik.handleSubmit} className="login__form">
            {isError && <div className="login__error">{errorMsg}</div>}
            {!isLogin && (
              <div className="login__form-group">
                <label htmlFor="name" className="login__label">Name</label>
                <input
                  type="text"
                  id="name"
                  {...formik.getFieldProps('name')}
                  className="login__input"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="login__field-error">{formik.errors.name}</div>
                )}
              </div>
            )}
            <div className="login__form-group">
              <label htmlFor="email" className="login__label">Email</label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps('email')}
                className="login__input"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="login__field-error">{formik.errors.email}</div>
              )}
            </div>
            <div className="login__form-group">
              <label htmlFor="password" className="login__label">Password</label>
              <input
                type="password"
                id="password"
                {...formik.getFieldProps('password')}
                className="login__input"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="login__field-error">{formik.errors.password}</div>
              )}
            </div>
            <button type="submit" className="login__submit">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;