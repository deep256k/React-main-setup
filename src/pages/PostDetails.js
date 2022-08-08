import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import ShowPost from "../UI/ShowPost";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";

const API_URL = "http://localhost:8080";

const PostDetails = () => {
  const [post, setPosts] = useState(null);
  const params = useParams();
  const postId = params.postId;
  const authCtx = useContext(AuthContext);

  const { error, loading, sendRequests: fetchPostDetails } = useHttp();

  const modifyData = (data) => {
    setPosts(data.post);
  };

  useEffect(() => {
    fetchPostDetails(
      {
        url: `${API_URL}/feed/post/${postId}`,
        headers: { Authorization: "Bearer " + authCtx?.token },
      },
      modifyData
    );
  }, [authCtx?.token, fetchPostDetails, postId]);

  return (
    <Box>
      {loading && <Box>loading....</Box>}
      {!error && !loading && post && (
        <Box>
          <ShowPost post={post} isEdit={true}></ShowPost>
        </Box>
      )}
      {error && (
        <Box>
          <Heading color={"red"}>{error}</Heading>
        </Box>
      )}
    </Box>
  );
};

export default PostDetails;
