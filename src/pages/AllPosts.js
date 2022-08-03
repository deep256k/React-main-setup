import ShowPost from "../UI/ShowPost";
import { Box, Button, Heading, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

const API_URL = "http://localhost:8080";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const resposne = await fetch(`${API_URL}/feed/posts`, {
        headers: {
          Authorization: "Bearer " + authCtx?.token,
        },
      });
      if (!resposne.ok) {
        console.log("error");
        //throw new Error("Something went wrong");
      }
      const data = await resposne.json();
      const fetchedPosts = data.posts;
      setPosts(fetchedPosts);
    } catch (err) {
      console.log("error thrown", err);
      setError(err.message || "Something went wrong");
      console.log("there is some errpr");
    }
    setLoading(false);
  };

  const deletePostHandler = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const resposne = await fetch(`${API_URL}/feed/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + authCtx?.token,
        },
      });
      if (!resposne.ok) {
        console.log("error");
        //throw new Error("Something went wrong");
      }
      const data = await resposne.json();
      if (data) {
        fetchPosts();
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  const viewPostsHandler = (postId) => {
    history.push(`/post-details/${postId}`);
  };

  const addPostHandler = () => {
    history.push("/create-post");
  };

  const editPosthandler = (postId) => {
    history.push(`/edit-post/${postId}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
          <Button>Fetch Again </Button>
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
      {posts.length === 0 && !loading && (
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
