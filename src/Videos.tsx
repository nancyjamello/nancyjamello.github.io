import React from "react";
import { Box } from "@chakra-ui/react";

import VideoSummary from "./VideoSummary";

const Videos = () => {
  return (
    <Box
        display="flex"
        flexDirection="column"
      >
      <VideoSummary />
      <VideoSummary />
      <VideoSummary />
      <VideoSummary />
    </Box>
  );
};

export default Videos;
