import { useState } from "react";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as Style } from "../../assets/signup.svg";
import "./Signup.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import history from "../../history";
import { useSnackbar } from "react-simple-snackbar";
const Signup = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [CnPassword, setCnPassword] = useState("");
  const options = {
    position: "top-left",
    style: {
      // backgroundColor: '#930696',
      background: "linear-gradient(180deg, #5e3173 0.31%, #000000 102.17%)",
      color: "white",
      fontFamily: "Montserrat, sans-serif",
      fontSize: "16px",
      textAlign: "center",
    },
    closeStyle: {
      color: "black",
      fontSize: "10px",
    },
  };
  const [openSnackbar] = useSnackbar(options);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("assasas");
      const { data } = await axios({
        method: "post",
        url: "http://127.0.0.1:8080/api/v1/users/signup-basic",
        data: {
          name: `${FirstName} ${LastName}`,
          email: Email,
          password: Password,
          confirmPassword: CnPassword,
        },
      });
      console.log(data);
      window.localStorage.setItem("token", data.jwtToken);
      openSnackbar("Account created successfully!");
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } catch (err) {
      console.log(err);
      alert(err.response?.data.message);
    }
  };
  return (
    <div className="signup">
      <div className="signup_left">
        <Link to={"/"} className="signup_left-goback">
          ←
        </Link>
        <Logo className="signup-logo" />
        <div className="signup-main">
          <form className="signup-form" onSubmit={(e) => onSubmit(e)}>
            <div className="signup-form-title">Create an Account</div>
            <label htmlFor="first-name" className="signup-form-label">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              className="signup-form-input"
              value={FirstName}
              autoComplete="off"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <label htmlFor="last-name" className="signup-form-label">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              className="signup-form-input"
              value={LastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              autoComplete="off"
            />
            <label htmlFor="email" className="signup-form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="signup-form-input"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="off"
            />
            <label htmlFor="password" className="signup-form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="signup-form-input"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="off"
            />
            <label htmlFor="confirm-pass" className="signup-form-label">
              Confirm Password
            </label>
            <input
              id="confirm-pass"
              type="password"
              className="signup-form-input"
              value={CnPassword}
              onChange={(e) => {
                setCnPassword(e.target.value);
              }}
              autoComplete="off"
            />
            <button className="signup-form-btn">Sign Up</button>
          </form>
          <div className="signup-already">
            If already a user, then{" "}
            <Link className="signup-already-link" to={"/login"}>
              Login here! →
            </Link>
          </div>
        </div>
      </div>
      <div className="signup_right">
        <div className="signup_right-container">
          <div className="signup_right-container-electro">electro</div>
          <Style className="signup_right-container-design" />
          <div className="signup_right-container-buy">buy</div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
