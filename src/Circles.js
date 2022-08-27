import { Box } from "@chakra-ui/react";
import React from "react";

const Circles = (props) => {
  let { circleDepth } = props;
  if (circleDepth === 0) {
    return;
  }
  //   let depth = new Array(circleDepth).fill(1);
  let increment = 40;
  return (
    <Box>
      <Box
        height={circleDepth * increment + "px"}
        width={circleDepth * increment + "px"}
        borderRadius={"50%"}
        border="1px solid black"
        position={"relative"}
        margin="20px"
      >
        <Circles circleDepth={--circleDepth}></Circles>
      </Box>
    </Box>
  );
};

export default Circles;
