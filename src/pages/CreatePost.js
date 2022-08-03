import NewPost from "../UI/NewPost";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

const API_URL = "http://localhost:8080";

const CreatePost = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const managePosts = async (postData) => {
    setLoading(true);
    setError(null);
    try {
      const resposne = await fetch(`${API_URL}/feed/post`, {
        method: "POST",
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
      console.log("data is ", data);
    } catch (err) {
      console.log("error thrown", err);
      setError(err.message || "Something went wrong");
      console.log("there is some errpr");
    }
    setLoading(false);
  };

  const postHandler = (postObj) => {
    managePosts(postObj);
  };
  return <NewPost postHandler={postHandler} isEdit={false}></NewPost>;
};

export default CreatePost;
