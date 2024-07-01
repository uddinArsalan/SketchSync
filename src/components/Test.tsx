import { useContext } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import loginErrorImg from "../assets/mainImg/login Error.avif";

const Test = () => {
  const { data } = useContext(FirebaseContext);
  const isLogin = localStorage.getItem("isLogin");
  const srcImg = isLogin ? data : loginErrorImg;

  return (
    <>
      {!isLogin && <div className="loginError">Sign Up First!</div>}
      <img
        src={srcImg}
        width="100%"
        height="100%"
        className="testScreen"
        style={{ overflow: "hidden" }}
        alt=""
      />
    </>
  );
};

export default Test;
