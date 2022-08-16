import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  Heading,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: null };
};

const userNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: null };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 6 };
  }
  return { value: "", isValid: null };
};

const AuthForm = (props) => {
  //const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [usernameState, dispatchUserName] = useReducer(userNameReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const emailHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = (event) => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const userNameHandler = (event) => {
    dispatchUserName({ type: "USER_INPUT", val: event.target.value });
  };

  const validateNameHandler = (event) => {
    dispatchUserName({ type: "INPUT_BLUR" });
  };

  const passwordHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validatePasswordHandler = (event) => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const resetForm = () => {
    emailState.value = "";
    emailState.isValid = null;
    passwordState.value = "";
    usernameState.value = "";
    usernameState.isValid = null;
    passwordState.isValid = null;
  };
  const switchAuthModeHandler = () => {
    resetForm();

    setIsLogin((prevState) => !prevState);
  };

  useEffect(() => {
    if (isLogin) {
      setIsFormValid(emailState.isValid);
    } else {
      setIsFormValid(
        emailState.isValid && passwordState.isValid && usernameState.isValid
      );
    }
  }, [
    emailState.isValid,
    isLogin,
    passwordState.isValid,
    usernameState.isValid,
  ]);

  const authHandler = (event) => {
    event.preventDefault();
    let authObj = {};
    if (!isLogin) {
      authObj = {
        email: emailState.value,
        password: passwordState.value,
        name: usernameState.value,
      };
    } else {
      authObj = {
        email: emailState.value,
        password: passwordState.value,
      };
    }
    props.authHandler(isLogin, authObj);
  };
  return (
    <Box border={"1px solid #3b0062"} padding={4} width="50%" margin={"0 auto"}>
      <Heading textAlign={"center"} mb={5} color="#3b0062">
        {isLogin ? "Login" : "Sign Up"}
      </Heading>
      <form onSubmit={authHandler}>
        <Box>
          <FormControl
            w="80%"
            mr="24px"
            mb={5}
            isInvalid={emailState.isValid === false}
          >
            <FormLabel htmlFor="email">Enter Your email</FormLabel>
            <Input
              id="title"
              type="email"
              value={emailState.value}
              onChange={emailHandler}
              onBlur={validateEmailHandler}
              name="email"
            />
            {/* {emailState.isValid === false && (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )} */}
          </FormControl>
          {!isLogin && (
            <FormControl
              w="80%"
              mb={5}
              isInvalid={usernameState.isValid === false}
            >
              <FormLabel htmlFor="userName">
                Enter Your Name (Must be 4 characters long)
              </FormLabel>
              <Input
                id="userName"
                type="userName"
                value={usernameState.value}
                onChange={userNameHandler}
                onBlur={validateNameHandler}
                name="password"
              />
              {/* <FormErrorMessage>
                User Name must be 4 characters long
              </FormErrorMessage> */}
            </FormControl>
          )}
          <FormControl
            w="80%"
            isInvalid={passwordState.isValid === false && !isLogin}
          >
            <FormLabel htmlFor="password">
              Enter Your Password{" "}
              {!isLogin && <span>(Must be 6 characters long)</span>}
            </FormLabel>
            <Input
              id="password"
              type="password"
              value={passwordState.value}
              onChange={passwordHandler}
              onBlur={validatePasswordHandler}
              name="password"
            />
            {/* <FormErrorMessage>
              Password must be 4 characters long
            </FormErrorMessage> */}
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="flex-start" mt={4}>
          <Button
            type="submit"
            bg={"#3b0062"}
            color="white"
            disabled={!isFormValid}
          >
            {isLogin ? "Login" : "Create Account"}
          </Button>
        </Box>
      </form>
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
