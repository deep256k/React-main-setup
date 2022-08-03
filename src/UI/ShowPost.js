import { Box, Button, Heading } from "@chakra-ui/react";
import EditPost from "../pages/EditPost";

const ShowPost = (props) => {
  const { post, isEdit } = props;

  const deletePost = (postid) => {
    props.deletePost(postid);
  };

  const viewPosts = (postId) => {
    props.viewPostsHandler(postId);
  };

  const editPost = (postId) => {
    props.editPosthandler(postId);
  };

  return (
    <Box border="1px solid #3b0062" p="20px" mb={5}>
      <Heading fontSize={"16px"} color="#707070" mb={4}>
        Created by - {post?.creator?.name}
      </Heading>
      <Heading fontSize="22px" color="#3b0062" mb={5}>
        {post?.title}
      </Heading>
      {isEdit && (
        <Heading textAlign={"center"} fontSize="16px" color="#3b0062">
          {post?.content}
        </Heading>
      )}
      {!isEdit && (
        <Box display={"flex"} justifyContent="flex-end">
          <Button
            mr={2}
            colorScheme="facebook"
            onClick={() => viewPosts(post._id)}
          >
            View
          </Button>
          <Button
            mr={2}
            colorScheme="telegram"
            onClick={() => editPost(post._id, true)}
          >
            Edit
          </Button>
          <Button colorScheme={"red"} onClick={() => deletePost(post._id)}>
            Delete
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default ShowPost;
