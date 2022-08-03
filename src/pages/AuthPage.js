import AuthForm from "../UI/AuthForm";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

const API_URL = "http://localhost:8080";

const AuthPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const manageAuth = async (isLogin, authObj) => {
    setLoading(true);
    setError(null);
    let method;
    let url;
    if (isLogin) {
      method = "POST";
      url = `${API_URL}/auth/login`;
    } else {
      method = "PUT";
      url = `${API_URL}/auth/signup`;
    }
    try {
      const resposne = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authObj),
      });
      if (!resposne.ok) {
        throw new Error("Something went wrong");
      }
      const data = await resposne.json();
      if (isLogin) {
        authCtx.login(data.token, Date.now() + 10000);
        history.replace("/posts");
      }
      console.log("data is ", data);
    } catch (err) {
      console.log("error thrown", err);
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  const authHandler = (isLogin, authObj) => {
    manageAuth(isLogin, authObj);
    console.log("login", isLogin, authObj);
  };
  return <AuthForm authHandler={authHandler}></AuthForm>;
};

export default AuthPage;
