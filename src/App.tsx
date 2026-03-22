import React, { useState } from "react";
import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";
import VideoSection from "./VideoSection";

const BLUE = "#94a7ab";
const WINE = "rgb(192, 85, 118)";
const BLUE_DARK = "#7a9195";

const DVDS = [
  {
    title: "Yoga with Nancy",
    year: "2002",
    description: "Two one-hour yoga classes included",
  },
  {
    title: "Yoga for the Blind and Visually Impaired",
    year: "2009",
    description: "Adaptive yoga instruction",
  },
  {
    title: "Yoga with Nancy / Work it Out Old School",
    subtitle: "Legs and Sun / Neck and Back",
    year: "1991",
    description: "Classic yoga instruction",
  },
  {
    title: "Ruth\u2019s Relax and Renew Meditations",
    year: "",
    description: "Guided meditation audio CD",
  },
];

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Videos", href: "#videos" },
  { label: "DVDs", href: "#dvds" },
  { label: "Contact", href: "#contact" },
];

const IMG = (name: string) => `${process.env.PUBLIC_URL}/images/${name}`;

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box fontFamily="'Livory', Georgia, 'Times New Roman', sans-serif" color="#2d2d2d">
      {/* ─── Header ─── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(255,255,255,0.97)",
          borderBottom: "1px solid #e8e4df",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <Flex
          maxW="1200px"
          mx="auto"
          px={{ base: "16px", md: "40px" }}
          h="60px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link
            href="#"
            fontSize="xl"
            fontWeight="600"
            color={WINE}
            textDecoration="none"
            _hover={{ textDecoration: "none", opacity: 0.7 }}
          >
            Yoga with Nancy
          </Link>

          {/* Desktop nav */}
          <nav>
            <Flex
              gap="28px"
              alignItems="center"
              display={{ base: "none", md: "flex" }}
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  fontSize="sm"
                  fontWeight="400"
                  color={WINE}
                  textDecoration="none"
                  _hover={{ opacity: 0.7, textDecoration: "none" }}
                >
                  {item.label}
                </Link>
              ))}
            </Flex>
          </nav>

          {/* Mobile hamburger button */}
          <Box
            display={{ base: "flex", md: "none" }}
            flexDirection="column"
            justifyContent="center"
            gap="5px"
            w="28px"
            h="28px"
            cursor="pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <Box
              h="2px"
              bg="#2d2d2d"
              borderRadius="1px"
              transition="all 0.3s"
              transform={menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none"}
            />
            <Box
              h="2px"
              bg="#2d2d2d"
              borderRadius="1px"
              transition="all 0.3s"
              opacity={menuOpen ? 0 : 1}
            />
            <Box
              h="2px"
              bg="#2d2d2d"
              borderRadius="1px"
              transition="all 0.3s"
              transform={menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"}
            />
          </Box>
        </Flex>

        {/* Mobile dropdown menu */}
        <Box
          display={{ base: "block", md: "none" }}
          overflow="hidden"
          maxH={menuOpen ? "300px" : "0"}
          transition="max-height 0.3s ease"
          bg="rgba(255,255,255,0.99)"
          borderTop={menuOpen ? "1px solid #e8e4df" : "none"}
        >
          <Flex direction="column" py="8px">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                fontSize="md"
                fontWeight="400"
                color={WINE}
                textDecoration="none"
                py="12px"
                px="20px"
                _hover={{ opacity: 0.7, textDecoration: "none", bg: "#f5f5f5" }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </Flex>
        </Box>
      </header>

      {/* ─── Hero: flower field background ─── */}
      <Box
        position="relative"
        minH={{ base: "70vh", md: "90vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px="20px"
        style={{
          backgroundImage: `url(${IMG("hero-meditation.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
        }}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(0,0,0,0.35)"
        />
        <Box position="relative" zIndex="1" maxW="800px">
          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
            fontWeight="400"
            fontStyle="italic"
            lineHeight="1.2"
            letterSpacing="-0.01em"
            color="white"
            mb="16px"
          >
            Contemporary Blend of Traditional and Nontraditional Hatha Yoga
          </Heading>
          <Text
            fontSize="sm"
            fontWeight="500"
            letterSpacing="0.2em"
            color="rgba(255,255,255,0.8)"
            textTransform="uppercase"
          >
            Saratoga &amp; San Jose, California
          </Text>
        </Box>
      </Box>

      {/* ─── About: steel blue with tagline + bio ─── */}
      <Box
        id="about"
        py={{ base: "60px", md: "100px" }}
        px={{ base: "20px", md: "40px" }}
        bg={BLUE}
      >
        <Box maxW="900px" mx="auto" textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "3xl" }}
            fontWeight="400"
            fontStyle="italic"
            color="white"
            lineHeight="1.6"
            mb="32px"
          >
            Enjoy harmony in balance as you work on breathing, flexibility,
            strength, and relaxation. Learn to work at your own level.
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="300"
            color="rgba(255,255,255,0.9)"
            lineHeight="2"
            mb="16px"
          >
            Nancy Portugal Jamello has been studying Yoga since 1968 and has
            taught in Silicon Valley since 1984. Nancy has studied with a
            variety of instructors and enjoys combining styles.
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="300"
            color="rgba(255,255,255,0.9)"
            lineHeight="2"
          >
            Her background includes nursing and owning a natural foods business.
            In addition to Yoga, Nancy has taught cardiac rehabilitation, senior
            fitness, swimming and dance.
          </Text>
        </Box>
      </Box>

      {/* ─── Photo separator: single row, ratio-matched, no crop ─── */}
      <Flex>
        {[
          { src: "yoga-class-1.jpg", alt: "Yoga class - triangle pose", ratio: 1.4863 },
          { src: "nancy-portrait.jpg", alt: "Nancy with students - tree pose", ratio: 1.0 },
          { src: "yoga-class-2.jpg", alt: "Yoga class - warrior II pose", ratio: 1.4611 },
        ].map((img) => (
          <Box key={img.src} flex={`${img.ratio}`} minW="0">
            <img
              src={IMG(img.src)}
              alt={img.alt}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </Box>
        ))}
      </Flex>

      {/* ─── Videos ─── */}
      <Box
        id="videos"
        py={{ base: "60px", md: "100px" }}
        px={{ base: "20px", md: "40px" }}
        bg="white"
      >
        <Box maxW="1200px" mx="auto">
          <VideoSection />
        </Box>
      </Box>

      {/* ─── DVDs: steel blue background ─── */}
      <Box
        id="dvds"
        py={{ base: "60px", md: "100px" }}
        px={{ base: "20px", md: "40px" }}
        bg={BLUE}
      >
        <Box maxW="800px" mx="auto" textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="600"
            color="white"
            mb="16px"
          >
            Yoga DVDs
          </Heading>
          <Text
            fontSize="md"
            fontWeight="300"
            color="rgba(255,255,255,0.85)"
            mb="40px"
            lineHeight="1.8"
          >
            Yoga DVDs and Meditation CD can be mailed to you for $20 each.
          </Text>

          <Flex direction="column" gap="20px" textAlign="left">
            {DVDS.map((dvd, i) => (
              <Box
                key={i}
                p={{ base: "20px", md: "24px" }}
                bg="rgba(255,255,255,0.12)"
                borderLeft="4px solid rgba(255,255,255,0.4)"
                borderRadius="md"
              >
                <Text fontSize="md" fontWeight="500" color="white" mb="2px">
                  {dvd.title}
                  {dvd.year && (
                    <Text as="span" fontSize="sm" fontWeight="300" color="rgba(255,255,255,0.6)" ml="8px">
                      ({dvd.year})
                    </Text>
                  )}
                </Text>
                {"subtitle" in dvd && dvd.subtitle && (
                  <Text fontSize="sm" fontWeight="400" color="rgba(255,255,255,0.7)" mb="4px">
                    {dvd.subtitle}
                  </Text>
                )}
                <Text fontSize="sm" fontWeight="300" fontStyle="italic" color="rgba(255,255,255,0.7)">
                  {dvd.description}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* ─── Contact with blue background ─── */}
      <Box
        id="contact"
        py={{ base: "60px", md: "100px" }}
        px={{ base: "20px", md: "40px" }}
        bg={BLUE}
      >
        <Box maxW="800px" mx="auto" textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="600"
            color="white"
            mb="16px"
          >
            Contact
          </Heading>
          <Text
            fontSize="md"
            fontWeight="300"
            color="rgba(255,255,255,0.85)"
            lineHeight="1.8"
            mb="24px"
          >
            <em>Contact me for more information and to order yoga DVDs.</em>
          </Text>
          <Text fontSize="md" fontWeight="500" color="white" mb="4px">
            Work it Out
          </Text>
          <Text fontSize="md" fontWeight="300" color="rgba(255,255,255,0.85)">
            P.O. Box 2294
          </Text>
          <Text fontSize="md" fontWeight="300" color="rgba(255,255,255,0.85)">
            Saratoga, CA 95070
          </Text>
        </Box>
      </Box>

      {/* ─── Footer ─── */}
      <Box
        py="24px"
        px="20px"
        bg={BLUE_DARK}
        textAlign="center"
      >
        <Text fontSize="xs" fontWeight="300" color="rgba(255,255,255,0.6)">
          &copy; {new Date().getFullYear()} Nancy Portugal Jamello
        </Text>
      </Box>
    </Box>
  );
};

export default App;
