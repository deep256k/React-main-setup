import { Box, Button, Heading, List, ListItem } from "@chakra-ui/react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

const NavBar = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const goToPosts = () => {
    history.push("/posts");
  };
  const authHandler = () => {
    authCtx.logout();
    history.push("/auth");
  };
  return (
    <header>
      <Box
        width="100%"
        bg="#3b0062"
        height="60px"
        p={3}
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Heading color={"white"}> React Mange Posts</Heading>
        {authCtx.isLoggedIn && (
          <Box display={"flex"}>
            <Box mr={3}>
              <Button onClick={goToPosts}>All Posts</Button>
            </Box>
            <Box>
              <Button mr={6} onClick={authHandler}>
                Logout
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </header>
  );
};
export default NavBar;
