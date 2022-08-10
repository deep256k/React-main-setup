import ShowPost from "../UI/ShowPost";
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  Spinner,
  InputLeftElement,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import { SearchIcon } from "@chakra-ui/icons";

const API_URL = "http://localhost:8080";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [allData, setAllData] = useState([]);
  const [fetchUpdated, setfetchUpdated] = useState(false);
  const [updatedPage, setUpdatedPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const { currentPage, hasNextPage, hasPrevpage, lastPage, totalItems } =
    allData;
  const pageLimit = lastPage < 5 ? lastPage : 5;

  const modifyData = (data) => {
    const fetchedPosts = data.posts;
    setPosts(fetchedPosts);
    setAllData(data);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  const fetchPageData = (index) => {
    resetSearchText();
    setUpdatedPage(index);
  };

  const { error, loading, sendRequests: managePosts } = useHttp();

  const goToPreviousPage = () => {
    resetSearchText();
    setUpdatedPage((prePage) => prePage - 1);
  };

  const goToNextPage = () => {
    resetSearchText();
    setUpdatedPage((prePage) => prePage + 1);
  };
  useEffect(() => {
    managePosts(
      {
        url: `${API_URL}/feed/posts?page=${updatedPage}`,
        headers: { Authorization: "Bearer " + authCtx?.token },
      },
      modifyData
    );
  }, [authCtx?.token, managePosts, fetchUpdated, updatedPage]);

  const viewPostsHandler = (postId) => {
    history.push(`/post-details/${postId}`);
  };

  const addPostHandler = () => {
    history.push("/create-post");
  };

  const editPosthandler = (postId) => {
    history.push(`/edit-post/${postId}`);
  };

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
  const colorChange = (index) => {
    if (index === updatedPage) {
      return ["#3b0062", "white"];
    } else {
      return ["#EDF2F7", "black"];
    }
  };

  const filterPosts = (searchValue) => {
    const filterPosts = posts.filter((post) => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    setPosts(filterPosts);
  };

  let timer;
  const searchHandler = (event) => {
    setSearchText(event.target.value);
    clearTimeout(timer);
    timer = setTimeout(() => {
      filterPosts(event.target.value);
    }, 500);
  };

  const resetSearchText = () => {
    setSearchText("");
  };
  return (
    <Box>
      <Box display={"flex"} justifyContent="space-between" mb={5}>
        <Button bg={"#3b0062"} color="white" onClick={addPostHandler}>
          Add a New Post
        </Button>
        <Box>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              placeholder="Seach post with title"
              onChange={searchHandler}
              borderColor="#3b0062"
              value={searchText}
            ></Input>
          </InputGroup>
        </Box>
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
          {totalItems > posts.length && (
            <Box textAlign={"center"}>
              {hasPrevpage && (
                <Button mr={2} onClick={goToPreviousPage}>
                  Prev
                </Button>
              )}
              {getPaginationGroup().length &&
                getPaginationGroup().map((index) => (
                  <Button
                    mr={2}
                    key={index}
                    onClick={() => fetchPageData(index)}
                    bg={colorChange(index)[0]}
                    color={colorChange(index)[1]}
                  >
                    {index}
                  </Button>
                ))}
              {hasNextPage && (
                <Button mr={2} onClick={goToNextPage}>
                  Next
                </Button>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AllPosts;
