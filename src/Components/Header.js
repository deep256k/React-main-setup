import { Box, Heading, Input, useDimensions } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../redux/productActions";

const Header = () => {
  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();

  const searchHandler = (event) => {
    dispatch(searchProducts(event.target.value));
  };
  return (
    <Box height={"100px"} bg="mediumaquamarine" p={"20px"}>
      <Box display={"flex"} justifyContent="space-between">
        <Heading>E-comm</Heading>
        <Box>
          <Input
            onChange={searchHandler}
            width={"300px"}
            height={"30px"}
            bg="white"
          ></Input>
        </Box>
        <Box>
          <Box>Cart Number- {cartData?.length > 0 ? cartData?.length : 0}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
