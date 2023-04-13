import React from "react";
import { ChakraProvider, Box, Text, Link } from "@chakra-ui/react";
import "@fontsource/literata";
import "@fontsource/inter";
import "@fontsource/caveat";

const About = () => {
  return (
    <Box as="main" w="100%">
      <Box
        w="100vw"
        h="calc(100vh - 50px)"
        bgImage={`url(https://images.squarespace-cdn.com/content/v1/5966811bf5e231568774f4c2/1500159781937-7S35ZUKYBN7IIXK5J6SM/Stocksy_txpdbbfa43erqZ100_Medium_599859.jpg?format=2500w)`}
        bgSize="cover"
        bgPosition="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="60%"
          h="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontFamily="caveat"
            fontSize="6xl"
            textAlign="center"
            color="white"
            p={4}
          >
            Contemporary Blend of Traditional and Nontraditional Hatha Yoga
          </Text>
        </Box>
        <Text
          fontFamily="caveat"
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          color="white"
          p={4}
        >
          SARATOGA & SAN JOSE, CALIFORNIA
        </Text>
      </Box>

      <Box
        w="100vw"
        h="calc(100vh - 50px)"
        bgSize="cover"
        bgPosition="center"
        bgColor="rgba(61,104,112,.6)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="75%"
          h="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontFamily="caveat"
            fontSize="4xl"
            textAlign="center"
            color="white"
            p={4}
          >
            Enjoy harmony in balance as you work on breathing, flexibility,
            strength, and relaxation. Learn to work at your own level.
          </Text>
          <Text
            fontFamily="caveat"
            fontSize="xl"
            textAlign="center"
            color="white"
            p={4}
          >
            Nancy Portugal Jamello has been studying Yoga since 1968 and has
            taught in Silicon Valley since 1984. Nancy has studied with a
            variety of instructors and enjoys combining styles. Her background
            includes nursing and owning a natural foods business. In addition to
            Yoga, Nancy has taught cardiac rehabilitation, senior fitness,
            swimming and dance.
          </Text>
        </Box>
      </Box>
      <Box
        w="100vw"
        h="100%"
        bgSize="cover"
        bgPosition="center"
        bgColor="FFFFAE2"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="75%"
          h="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontFamily="caveat"
            fontSize="4xl"
            textAlign="center"
            color="black"
            p={4}
          >
            Yoga DVDs
          </Text>
          <Text
            fontFamily="caveat"
            fontSize="xl"
            textAlign="center"
            color="black"
            p={4}
          >
            Yoga DVDs and Meditation CD can be viewed{" "}
            <Link href="./videos" color="teal.500">
              here
            </Link>{" "}
            or I can mail them to you for $20 each.
          </Text>
        </Box>
      </Box>

      <Box
        w="100vw"
        bgSize="cover"
        bgPosition="center"
        bgColor="rgba(61,104,112,.9)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontFamily="caveat"
          fontSize="l"
          textAlign="center"
          color="black"
        > © Copyright 2023, Nancy Portugal Jamello
        </Text>
        <Text
          fontFamily="caveat"
          fontSize="l"
          textAlign="center"
          color="black"
        >Website based on a design by Arden Waters
        </Text>
      </Box>
    </Box>
  );
};

export default About;
