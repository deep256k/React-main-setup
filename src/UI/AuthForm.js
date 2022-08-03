import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

const AuthForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const userNameHandler = (event) => {
    setUsername(event.target.value);
  };
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const authHandler = (isLogin) => {
    let authObj = {};
    if (!isLogin) {
      authObj = {
        email: email,
        password: password,
        name: userName,
      };
    } else {
      authObj = {
        email: email,
        password: password,
      };
    }
    props.authHandler(isLogin, authObj);
  };
  return (
    <Box border={"1px solid #3b0062"} padding={4} width="50%" margin={"0 auto"}>
      <Heading textAlign={"center"} mb={5} color="#3b0062">
        {isLogin ? "Login" : "Sign Up"}
      </Heading>
      <Box>
        <FormControl w="80%" mr="24px" mb={5}>
          <FormLabel htmlFor="email">Enter Your Email</FormLabel>
          <Input
            id="title"
            type="email"
            value={email}
            onChange={emailHandler}
            name="email"
          />
        </FormControl>
        {!isLogin && (
          <FormControl w="80%" mb={5}>
            <FormLabel htmlFor="userName">Enter Your Name</FormLabel>
            <Input
              id="userName"
              type="userName"
              value={userName}
              onChange={userNameHandler}
              name="password"
            />
          </FormControl>
        )}
        <FormControl w="80%">
          <FormLabel htmlFor="password">Enter Your Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={passwordHandler}
            name="password"
          />
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="flex-start" mt={4}>
        <Button
          type="submit"
          bg={"#3b0062"}
          color="white"
          onClick={() => authHandler(isLogin)}
        >
          {isLogin ? "Login" : "Create Account"}
        </Button>
      </Box>
      <Box mt={4}>
        <Button
          color={"#3b0062"}
          variant="link"
          onClick={switchAuthModeHandler}
        >
          {isLogin ? "Create new account" : "Login with existing account"}
        </Button>
      </Box>
    </Box>
  );
};
export default AuthForm;
