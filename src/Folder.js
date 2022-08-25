import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

const Folder = ({ folderData }) => {
  const [showFolder, setShowFolder] = useState(false);

  if (folderData.folder) {
    return (
      <Box display={"inline-block"} bg="black" color={"white"}>
        <Box
          onClick={() => {
            setShowFolder((pre) => !pre);
          }}
          px={2}
          color="green"
        >
          {folderData.name}
        </Box>
        {showFolder && (
          <Box>
            {folderData.items.map((item) => (
              <Box key={item.name} pl={4}>
                <Folder folderData={item}></Folder>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    );
  } else {
    return <Box>{folderData.name}</Box>;
  }
};

export default Folder;
