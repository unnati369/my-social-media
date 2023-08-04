
import { PostContext } from "../context/PostContext"
import { useLocation, useNavigate} from "react-router"
import { useContext, useState } from "react";

import { NavLink } from "react-router-dom";
export const Login = () =>{
    const [mail, setMailId] = useState(false);
    const [password, setPassword] = useState(false);
    const { dispatch, state } = useContext(PostContext);
    return (
      <>
        {/* <h1>Please login to continue</h1> */}
        <fieldset
        style={{
          margin: "5%",
          display: "flex",
          justifyTracks: "center",
          flexDirection: "column"
        }}
      >
        <h1>
          <span
            onClick={() => dispatch({ type: "account", payload: false })}
            style={{ color: state.create ? "red" : "black" }}
          >
            Create Account{" "}
          </span>
          /
          <span
            onClick={() => dispatch({ type: "account", payload: true })}
            style={{ color: !state.create ? "red" : "black" }}
          >
            {" "}
            Sign In
          </span>{" "}
        </h1>
        {!state.create && (
          <>
            <label>
              Enter email :{" "}
              <input
                required
                placeholder="xyz@gmail.com"
                style={{ margin: "2%" }}
                onChange={() => setMailId(true)}
              />
            </label>
            <label>
              Enter password :{" "}
              <input
                type={state.hidePassword ? "password" : "text"}
                style={{ margin: "3%" }}
                onChange={() => setPassword(true)}
              />
              <img
                src={
                  state.hidePassword
                    ? "https://cdn1.iconfinder.com/data/icons/hawcons/32/699007-icon-21-eye-hidden-512.png"
                    : "https://cdn2.vectorstock.com/i/1000x1000/02/06/eye-icon-on-white-background-vector-27400206.jpg"
                }
                alt="show/hide"
                height="35px"
                onClick={() => dispatch({ type: "hidePassword" })}
              />
            </label>

            {password && mail ? (
              <button
                style={{ margin: "2% 40%" }}
                onClick={() => dispatch({ type: "signIn" })}
              >
                Login
              </button>
            ) : (
              <p>Enter valid email and password!</p>
            )}
          </>
        )}
        {state.create && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignSelf: "center"
            }}
          >
            <label>
              Enter email :
              <input
                placeholder="xyz@gmail.com"
                style={{ margin: "3%" }}
                required
              />
            </label>
            <label>
              Firstname :
              <input
                style={{ margin: "3%" }}
                required
                // onChange={() => setPassword(true)}
              />
            </label>
            <label>
              Lastname :
              <input
                style={{ margin: "3%" }}
                required
                // onChange={() => setPassword(true)}
              />{" "}
            </label>
            <label>
              Enter password :
              <input
                required
                type={state.hidePassword ? "password" : "text"}
                style={{ margin: "3%" }}
                onChange={(e) => {
                  dispatch({
                    type: "password",
                    payload: e.target.value
                  });
                  dispatch({ type: "confirm" });
                  console.log("password is" + state.passwords);
                }}
              />{" "}
            </label>
            <label>
              Confirm password :
              <input
                required
                type={state.hidePassword ? "password" : "text"}
                style={{ margin: "3%" }}
                onChange={(e) => {
                  dispatch({
                    type: "repassword",
                    payload: e.target.value
                  });
                  dispatch({ type: "confirm" });
                  console.log(state.repassword);
                }}
              />
              <img
                src={
                  state.hidePassword
                    ? "https://cdn1.iconfinder.com/data/icons/hawcons/32/699007-icon-21-eye-hidden-512.png"
                    : "https://cdn2.vectorstock.com/i/1000x1000/02/06/eye-icon-on-white-background-vector-27400206.jpg"
                }
                alt="show/hide"
                height="35px"
                onClick={() => dispatch({ type: "hidePassword" })}
              />{" "}
            </label>{" "}
            {state.confirm ? (
              <button
                style={{ margin: "2% 35%" }}
                onClick={() => dispatch({ type: "signIn" })}
              >
                Create Account
              </button>
            ) : (
              <p>Password doesn't match!</p>
            )}
          </div>
        )}
      </fieldset>
      </>
    );
  };