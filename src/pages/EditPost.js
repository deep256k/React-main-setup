import NewPost from "../UI/NewPost";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
const API_URL = "http://localhost:8080";

const EditPost = () => {
  let editObj = {
    title: "Dummy",
    content: "Dummy content",
  };
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const postId = params.postId;
  const history = useHistory();
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
      editObj = {
        title: data.post.title,
        content: data.post.content,
      };
    } catch (err) {
      console.log("error thrown", err);
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  const editPosts = async (postData) => {
    setLoading(true);
    setError(null);
    try {
      const resposne = await fetch(`${API_URL}/feed/post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx?.token,
        },
        body: JSON.stringify(postData),
      });
      if (!resposne.ok) {
        console.log("error");
        //throw new Error("Something went wrong");
      }
      const data = await resposne.json();
      if (data) {
        history.push("/posts");
      }
    } catch (err) {
      console.log("error thrown", err);
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  const postHandler = (postObj) => {
    editPosts(postObj);
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  return (
    <Box>
      {!loading && (
        <NewPost
          isEdit={true}
          editObj={editObj}
          postHandler={postHandler}
        ></NewPost>
      )}
      ;
    </Box>
  );
};

export default EditPost;
