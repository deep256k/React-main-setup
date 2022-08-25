import logo from "./logo.svg";
import "./App.css";
import { Box } from "@chakra-ui/react";
import Folder from "./Folder";
import folderdata from "./data/Data";

function App() {
  return (
    <div className="App">
      <Folder folderData={folderdata}></Folder>
    </div>
  );
}

export default App;
