import ShowPost from "../UI/ShowPost";
import { Box, Button, Heading, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";

const API_URL = "http://localhost:8080";

const AllPosts = () => {
  //console.log("AllPosts running");
  const [posts, setPosts] = useState([]);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [fetchUpdated, setfetchUpdated] = useState(false);

  const modifyData = (data) => {
    const fetchedPosts = data.posts;
    setPosts(fetchedPosts);
  };

  const { error, loading, sendRequests: managePosts } = useHttp();

  const deletePostHandler = (postId) => {
    managePosts(
      {
        url: `${API_URL}/feed/post/${postId}`,
        headers: { Authorization: "Bearer " + authCtx?.token },
        method: "DELETE",
      },
      () => {
        setfetchUpdated(true);
      }
    );
  };

  useEffect(() => {
    managePosts(
      {
        url: `${API_URL}/feed/posts`,
        headers: { Authorization: "Bearer " + authCtx?.token },
      },
      modifyData
    );
  }, [authCtx?.token, managePosts, fetchUpdated]);

  const viewPostsHandler = (postId) => {
    history.push(`/post-details/${postId}`);
  };

  const addPostHandler = () => {
    history.push("/create-post");
  };

  const editPosthandler = (postId) => {
    history.push(`/edit-post/${postId}`);
  };

  return (
    <Box>
      <Box textAlign={"center"} mb={5}>
        <Button colorScheme="teal" onClick={addPostHandler}>
          Add a New Post
        </Button>
      </Box>
      {error && (
        <Box>
          <Heading>{error}</Heading>
          <Button onClick={() => managePosts()}>Fetch Again </Button>
        </Box>
      )}
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
      {posts.length === 0 && !loading && !error && (
        <Heading textAlign={"center"} color="#3b0062">
          Currently There are No Posts. Please add a Post
        </Heading>
      )}
      {!error && !loading && posts.length !== 0 && (
        <Box>
          {posts.map((post) => (
            <ShowPost
              key={post._id}
              post={post}
              deletePost={deletePostHandler}
              viewPostsHandler={viewPostsHandler}
              editPosthandler={editPosthandler}
              isEdit={false}
            ></ShowPost>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AllPosts;
