import React from "react";
import { ChakraProvider, Box, Text, Spacer, Link } from "@chakra-ui/react";
import "@fontsource/literata";
import "@fontsource/inter";
import "@fontsource/caveat";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About";
import Video from "./Video";
import Videos from "./Videos";

const App = () => {
  return (
    <ChakraProvider>
      <Box
        as="header"
        w="100%"
        h="50px"
        bg="#FFFFAE2"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="20px"
        gap="40px"
      >
        <Text fontFamily="caveat" fontSize="4xl" color="#a03576">
          Yoga with Nancy
        </Text>
        <Spacer />
        <Link
          fontFamily="caveat"
          fontSize="3xl"
          color="#a03576"
          href="./"
        >
          Info
        </Link>
        <Link
          fontFamily="caveat"
          fontSize="3xl"
          color="#a03576"
          href="./videos"
        >
          Videos
        </Link>
      </Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/video" element={<Video />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
