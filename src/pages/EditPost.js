import NewPost from "../UI/NewPost";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
const API_URL = "http://localhost:8080";

const EditPost = () => {
  let editObj = {
    title: "Dummy",
    content: "Dummy content",
  };
  //   const [error, setError] = useState(null);
  //   const [loading, setLoading] = useState(false);
  const params = useParams();
  const postId = params.postId;
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const fetchPostDetails = async () => {
    // setLoading(true);
    // setError(null);
    try {
      const resposne = await fetch(`${API_URL}/feed/post/${postId}`, {
        headers: {
          Authorization: "Bearer " + authCtx?.token,
        },
      });
      if (!resposne.ok) {
        //throw new Error("Something went wrong");
      }
      const data = await resposne.json();
      editObj = {
        title: data.post.title,
        content: data.post.content,
      };
    } catch (err) {
      //setError(err.message || "Something went wrong");
    }
    // setLoading(false);
  };

  const { error, loading, sendRequests: managePosts } = useHttp();

  const onPostSuccess = () => {
    history.push("/posts");
  };

  const postHandler = (postObj) => {
    managePosts(
      {
        url: `${API_URL}/feed/post/${postId}`,
        method: "PUT",
        body: JSON.stringify(postObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx?.token,
        },
      },
      onPostSuccess
    );
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

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
      {!loading && (
        <NewPost
          isEdit={true}
          editObj={editObj}
          postHandler={postHandler}
        ></NewPost>
      )}
      {error && (
        <Box>
          <Heading color={"red"}>{error}</Heading>
        </Box>
      )}
      ;
    </Box>
  );
};

export default EditPost;
