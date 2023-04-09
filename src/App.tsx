import React from "react";
import { ChakraProvider, Box, Text } from "@chakra-ui/react";
import "@fontsource/literata";
import "@fontsource/inter";
import "@fontsource/caveat";

const images = [
  "https://images.squarespace-cdn.com/content/v1/5966811bf5e231568774f4c2/1500159781937-7S35ZUKYBN7IIXK5J6SM/Stocksy_txpdbbfa43erqZ100_Medium_599859.jpg?format=2500w",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
  "https://images.unsplash.com/photo-1503431128871-cd250803fa41",
];

const texts = [
  "Contemporary Blend of Traditional and Nontraditional Hatha Yoga",
  "SARATOGA & SAN JOSE, CALIFORNIA",
  "This is a simple demo using React, TypeScript and Chakra",
  "You can scroll horizontally to see more images",
  "Hope you enjoy it!",
];

const App = () => {
  return (
    <ChakraProvider>
      <Box as="main" w="100%" h="calc(100vh)" overflowX="scroll">
        <Box
          as="header"
          w="100%"
          h="50px"
          bg="#FFFFAE2"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontFamily="caveat" fontSize="4xl" color="#c05576">
            Yoga with Nancy
          </Text>
        </Box>
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
          h="calc(100% - 50px)"
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
              includes nursing and owning a natural foods business. In addition
              to Yoga, Nancy has taught cardiac rehabilitation, senior fitness,
              swimming and dance.
            </Text>
          </Box>
        </Box>
        <Box
          w="100vw"
          h="calc(100% - 50px)"
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
              Enjoy harmony in balance as you work on breathing, flexibility,
              strength, and relaxation. Learn to work at your own level.
            </Text>
            <Text
              fontFamily="caveat"
              fontSize="xl"
              textAlign="center"
              color="black"
              p={4}
            >
              Yoga DVDs and Meditation CD can be purchased in class for $10 each
              or I can mail them to you for $20 each. NEW RELEASE! Yoga with
              Nancy DVD / 2002 Two one hour yoga classes included. Yoga for the
              Blind and Visually Impaired Educational Material DVD / 2009 Yoga
              with Nancy / Work it Out Old School Legs and Sun / Neck and Back
              DVD / 1991 Ruth's Relax and Renew Meditations Audio CD
            </Text>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
