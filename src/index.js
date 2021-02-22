import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { BiErrorCircle } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
} from "react-router-dom";
import "./main.css";
function App() {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [rePassword, setRePassword] = useState();
  const [rePasswordError, setRePasswordError] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("data");
    setData(data);
  }, []);

  const userNameValidation = () => {
    const symbols = /[$-/#@:-?{-~!"^`\[\]]/;

    if (userName == "") {
      setUserNameError("name must be filled");
    } else if (userName.length < 5) {
      setUserNameError("name can not be less than 5 charachter");
    } else if (symbols.test(userName)) {
      setUserNameError("name can not contain symbols");
    } else {
      setUserNameError(false);
      return true;
    }
  };

  const emailValidation = () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setEmailError("This email is invalid");
    } else {
      setEmailError(false);
      return true;
    }
  };

  const passwordSet = (e) => {
    setPassword(e.target.value);
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    var mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );

    // !! password strength control
    if (strongRegex.test(password)) {
      setPasswordStrength("strong");
    } else if (mediumRegex.test(password)) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("easy");
    }
  };
  const passwordValidation = () => {
    if (!password) {
      setPasswordError("Password must be filled");
      setPasswordStrength();
    } else if (password.length <= 7) {
      setPasswordError("Password must contain at least 7 character");
    } else {
      setPasswordError(false);

      return true;
    }
  };

  const rePasswordValidation = () => {
    if (rePassword !== password) {
      setRePasswordError("Password doesn't match ");
    } else {
      setRePasswordError(false);
      return true;
    }
  };

  const validation = () => {
    let valid = true;
    const isUserNameValid = userNameValidation();
    const isEmailValid = emailValidation();
    const isPasswordValid = passwordValidation();
    const isRePasswordValid = rePasswordValidation();

    valid = valid && isUserNameValid;
    valid = valid && isEmailValid;
    valid = valid && isPasswordValid;
    valid = valid && isRePasswordValid;

    return valid;
  };

  const onSubmit = (e) => {
    const isValid = validation();

    if (isValid) {
      const formData = [
        {
          userName: userName,
          email: email,
          password: password,
          rePassword: rePassword,
        },
      ];
      localStorage.setItem("data", JSON.stringify(formData));
      console.log(formData);
      e.returnValue = true;
    } else {
      e.preventDefault();
    }
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label>
            <input
              onChange={(e) => {
                setUserName(e.target.value);
                setUserNameError();
              }}
              className={!userNameError ? "success" : "error"}
              type="text"
              placeholder="Enter an username"
            />
          </label>
          <small className="error-text">{userNameError}</small>
        </div>

        <div>
          <label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError();
              }}
              className={!emailError ? "success" : "error"}
              type="text"
              placeholder="Enter your email"
            />
          </label>
          <small className="error-text">{emailError}</small>
        </div>
        <div>
          <label>
            <input
              className={!passwordError ? "success" : "error"}
              type="password"
              onChange={(e) => {
                passwordSet(e);
                setPasswordError();
              }}
              placeholder="Password"
              maxLength="20"
            />
            {password !== "" ? (
              <small className={`password-strength  ${passwordStrength}`}>
                {passwordStrength}
              </small>
            ) : null}
          </label>

          <small className="error-text">{passwordError}</small>
        </div>
        <div>
          <label>
            <input
              onChange={(e) => {
                setRePassword(e.target.value);
                setRePasswordError();
              }}
              className={!rePasswordError ? "success" : "error"}
              type="password"
              placeholder="Correct password"
              maxLength="20"
            />
          </label>
          <small className="error-text">{rePasswordError}</small>
        </div>
        <button type="submit">Sign up</button>
      </form>
      <p className="data">{data}</p>
    </>
  );
}

render(<App />, document.getElementById("root"));
