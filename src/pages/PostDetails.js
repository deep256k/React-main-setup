import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import ShowPost from "../UI/ShowPost";
import AuthContext from "../store/auth-context";

const API_URL = "http://localhost:8080";

const PostDetails = () => {
  const [post, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const postId = params.postId;
  const authCtx = useContext(AuthContext);

  const fetchPostDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const resposne = await fetch(`${API_URL}/feed/post/${postId}`, {
        headers: {
          Authorization: "Bearer " + authCtx?.token,
        },
      });
      if (!resposne.ok) {
        console.log("error");
        //throw new Error("Something went wrong");
      }
      const data = await resposne.json();
      console.log("detals are", data);
      setPosts(data.post);
    } catch (err) {
      console.log("error thrown", err);
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  return (
    <Box>
      {error && (
        <Box>
          <Heading>{error}</Heading>
        </Box>
      )}
      {loading && <Box>loading....</Box>}
      {!error && !loading && post && (
        <Box>
          <ShowPost post={post} isEdit={true}></ShowPost>
        </Box>
      )}
    </Box>
  );
};

export default PostDetails;
