import { Box, Button } from "@chakra-ui/react";
import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter, fetchData } from "../redux/actions";
import { INCREASE_COUNTER } from "../redux/constant";

const Counter = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state);
  console.log("value is", value);

  const incrementHandler = () => {
    dispatch({ type: INCREASE_COUNTER, payload: 5 });
  };

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <Box>
      <Box>{value.counterData.counter}</Box>
      <Button onClick={incrementHandler}>Increase</Button>
      <Button onClick={() => dispatch(decreaseCounter())}>Decrease</Button>
    </Box>
  );
};

export default Counter;
