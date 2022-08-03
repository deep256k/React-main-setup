import { Box } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <Box maxW="85%" w="70%" margin="2rem auto">
      {props.children}
    </Box>
  );
};
export default Layout;
