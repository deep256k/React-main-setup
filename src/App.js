import "./App.css";
import { Box } from "@chakra-ui/react";
import Header from "./Components/Header";
import Products from "./Components/Products";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Products></Products>
    </div>
  );
}

export default App;
