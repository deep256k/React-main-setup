import { Box, Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const NewPost = (props) => {
  const { isEdit, editObj } = props;
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const contenthandler = (event) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    if (isEdit) {
      setContent(editObj.content);
      setTitle(editObj.title);
    }
  }, []);

  const addPostHandler = () => {
    const postObj = {
      title: title,
      content: content,
    };
    props.postHandler(postObj);
  };
  return (
    <Box border={"1px solid #3b0062"} padding={4}>
      <Box>
        <FormControl w="40%" mr="24px" mb={5}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            type="title"
            value={title}
            onChange={titleHandler}
            name="title"
          />
        </FormControl>
        <FormControl w="40%">
          <FormLabel htmlFor="content">Content</FormLabel>
          <Input
            id="content"
            type="text"
            value={content}
            onChange={contenthandler}
            name="amount"
            // ref={amount}
          />
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button type="submit" colorScheme="blue" onClick={addPostHandler}>
          {isEdit ? "Edit Post" : "Add Post"}
        </Button>
      </Box>
    </Box>
  );
};
export default NewPost;
