import React from "react";
import { ChakraProvider, Box, Spacer, Link } from "@chakra-ui/react";
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
      <Box as="main" w="100%">
        <Box
          as="header"
          position="fixed"
          w="100%"
          h="50px"
          bg="white"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="20px"
          gap="40px"
          zIndex="1200"
        >
          <Link fontFamily="caveat" fontSize="4xl" color="#a03576" href="./">
            Yoga with Nancy
          </Link>
          <Spacer />
          <Link fontFamily="caveat" fontSize="3xl" color="#a03576" href="./">
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
        <Box pt="50px">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/video" element={<Video />} />
              <Route path="/videos" element={<Videos />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
