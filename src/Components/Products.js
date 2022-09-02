import { Box, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions";
import { fetchProducts } from "../redux/productActions";

const Products = () => {
  const dispatch = useDispatch();
  const fetcheddata = useSelector((state) => state.productReducer);
  console.log("fetcheddata", fetcheddata);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <Box display={"flex"} mt={"50px"} flexWrap={"wrap"}>
      {fetcheddata.length > 0 &&
        fetcheddata.map((item) => (
          <Box key={item.id} border="1px solid black" p={"25px"} m="20px">
            <Box>Name- {item.name}</Box>
            <Box> Price -{item.price}</Box>
            <Box>category- {item.category}</Box>
            <Box>Brand -{item.brand}</Box>
            <Button mr={2} onClick={() => dispatch(addToCart(item))}>
              Add to cart
            </Button>
            <Button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove from Cart
            </Button>
          </Box>
        ))}
    </Box>
  );
};

export default Products;
