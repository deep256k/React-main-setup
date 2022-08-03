import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import AllPosts from "./pages/AllPosts";
import AuthPage from "./pages/AuthPage";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import AuthContext from "./store/auth-context";
import Layout from "./UI/layout";
import NavBar from "./UI/NavBar";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Box>
      <NavBar></NavBar>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/auth"></Redirect>
          </Route>
          {authCtx.isLoggedIn && (
            <Route path="/posts">
              <AllPosts></AllPosts>
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/create-post">
              <CreatePost></CreatePost>
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/edit-post/:postId">
              <EditPost></EditPost>
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/post-details/:postId">
              <PostDetails></PostDetails>
            </Route>
          )}

          <Route path={"/auth"}>
            <AuthPage></AuthPage>
          </Route>

          <Route path="*">
            <Redirect to="/auth"></Redirect>
          </Route>
        </Switch>
      </Layout>
    </Box>
  );
}

export default App;
