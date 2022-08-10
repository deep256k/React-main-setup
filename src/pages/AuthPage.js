import AuthForm from "../UI/AuthForm";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import { Box, Spinner, Heading } from "@chakra-ui/react";

const API_URL = "http://localhost:8080";

const AuthPage = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const { error, loading, sendRequests: manageAuth } = useHttp();

  const onAuthSuccess = (isLogin, data) => {
    authCtx.login(data.token, Date.now() + 3600000);
    history.replace("/posts");
  };
  const authHandler = (isLogin, authObj) => {
    let method;
    let url;
    if (isLogin) {
      method = "POST";
      url = `${API_URL}/auth/login`;
    } else {
      method = "PUT";
      url = `${API_URL}/auth/signup`;
    }
    manageAuth(
      {
        url: url,
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authObj),
      },
      onAuthSuccess.bind(this, isLogin)
    );
  };
  return (
    <Box>
      {loading && (
        <Box textAlign={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      )}
      <AuthForm authHandler={authHandler}></AuthForm>;
      {error && (
        <Box>
          <Heading color={"red"}>{error}</Heading>
        </Box>
      )}
    </Box>
  );
};

export default AuthPage;
