import { Box, Input, TagLabel, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Circles from "./Circles";

const Depth = () => {
  const [depth, setDepth] = useState(0);
  const changeHandler = (event) => {
    console.log(typeof +event.target.value);
    setDepth(+event.target.value);
  };
  return (
    <Box>
      <Box width={"35%"} display="flex">
        <Text mr={4}>Enter Depth</Text>
        <Input type={"number"} w={"80%"} onChange={changeHandler}></Input>
      </Box>
      <Circles circleDepth={depth}></Circles>
    </Box>
  );
};

export default Depth;
