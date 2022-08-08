import NewPost from "../UI/NewPost";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import { Box, Spinner, Heading } from "@chakra-ui/react";

const API_URL = "http://localhost:8080";

const CreatePost = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const { error, loading, sendRequests: createPosts } = useHttp();

  const onPostSuccess = () => {
    history.push("/posts");
  };
  const postHandler = (postObj) => {
    createPosts(
      {
        url: `${API_URL}/feed/post`,
        method: "POST",
        body: JSON.stringify(postObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx?.token,
        },
      },
      onPostSuccess
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
      <NewPost postHandler={postHandler} isEdit={false}></NewPost>;
      {error && (
        <Box>
          <Heading color={"red"}>{error}</Heading>
        </Box>
      )}
    </Box>
  );
};

export default CreatePost;
