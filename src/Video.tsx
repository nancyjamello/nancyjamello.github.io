import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Video = () => {
  return (
    <Box as="main" w="100%" h="calc(100vh)" overflowX="scroll">
      <Box
        w="100vw"
        h="calc(100% - 50px)"
        bgImage={`url(https://images.squarespace-cdn.com/content/v1/5966811bf5e231568774f4c2/1500159781937-7S35ZUKYBN7IIXK5J6SM/Stocksy_txpdbbfa43erqZ100_Medium_599859.jpg?format=2500w)`}
        bgSize="cover"
        bgPosition="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <iframe
          src="https://drive.google.com/file/d/0B11pE_9lXspgeVMzTDlsZGMxb2M/preview?resourceKey=0-tkDZJZclZCBJXvYy8VvECA"
          width="100%"
          height="100%"
          allow="autoplay"
        ></iframe>
      </Box>
    </Box>
  );
};

export default Video;
