import React, { useState } from "react";
import { Box, Flex, Heading, Text, Link, Button } from "@chakra-ui/react";
import VideoSection from "./VideoSection";

const BLUE = "#94a7ab";
const WINE = "rgb(192, 85, 118)";
const BLUE_DARK = "#7a9195";
const ABOUT_BG = "#B57B8C";
const SECTION_ROSE = "#8BB6C1";

const DVDS = [
  {
    title: "Breathing Exercises and Meditation With Nancy",
    year: "2020-2026",
    description: "Short exercises to relax and renew",
  },
  {
    title: "Yoga With Nancy",
    year: "2017",
    description: "One 90 minute yoga instruction session",
  },
  {
    title: "Yoga for the Blind and Visually Impaired With Nancy",
    year: "2009",
    description: "Adaptive yoga instruction",
  },
  {
    title: "Yoga With Nancy",
    year: "2002",
    description: "Two 60 minute yoga instruction sessions",
  },
  {
    title: "Work It Out - Yoga With Nancy",
    subtitle: "Legs and Sun / Neck and Back",
    year: "1991",
    description: "Eight 30 minute yoga instruction sessions (sessions 1–4 and 6–9)",
  },
  {
    title: "Yoga With Ruth Barati",
    year: "1996",
    description: "Eight 90 minute beginner and intermediate classes with Ruth",
  },
  {
    title: "Ruth\u2019s Relax and Renew Meditations",
    year: "",
    description: "Guided meditation audio CD.",
  },
];

const NAV_ITEMS = [
  { label: "About Nancy", href: "#about" },
  { label: "Published Works", href: "#dvds" },
  { label: "Video Library", href: "#videos" },
  { label: "Contact Nancy", href: "#contact" },
  { label: "Donate", href: "#donate" },
];

const IMG = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

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
            fontSize="2xl"
            fontWeight="600"
            color={WINE}
            textDecoration="none"
            _hover={{ textDecoration: "none", opacity: 0.7 }}
          >
            Yoga With Nancy
          </Link>

          {/* Desktop nav */}
          <nav>
            <Flex
              gap="16px"
              alignItems="center"
              display={{ base: "none", md: "flex" }}
            >
              {NAV_ITEMS.map((item, index) => (
                <React.Fragment key={item.href}>
                  <Link
                    href={item.href}
                    fontSize="17px"
                    fontWeight="400"
                    color={WINE}
                    textDecoration="none"
                    _hover={{ opacity: 0.7, textDecoration: "none" }}
                  >
                    {item.label}
                  </Link>
                  {index < NAV_ITEMS.length - 1 && (
                    <Box h="18px" w="1px" bg="rgba(181,123,140,0.35)" />
                  )}
                </React.Fragment>
              ))}
            </Flex>
          </nav>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            style={{
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
              width: "28px",
              height: "28px",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
            }}
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
          </button>
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

      {/* ─── Hero: three-photo background ─── */}
      <Box
        position="relative"
        minH={{ base: "70vh", md: "90vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px="20px"
        overflow="hidden"
      >
        <Flex position="absolute" top="0" left="0" w="100%" h="100%">
          {[
            { src: "yoga-class-1.jpg", alt: "Yoga class - triangle pose", ratio: 1.4863 },
            { src: "nancy-portrait.jpg", alt: "Nancy with students - tree pose", ratio: 1.0 },
            { src: "yoga-class-2.jpg", alt: "Yoga class - warrior II pose", ratio: 1.4611 },
          ].map((img) => (
            <Box key={img.src} flex={`${img.ratio}`} minW="0" h="100%">
              <img
                src={IMG(img.src)}
                alt={img.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          ))}
        </Flex>
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
            fontSize={{ base: "14px", md: "17px" }}
            fontWeight="500"
            letterSpacing="0.2em"
            color="rgba(255,255,255,0.8)"
            textTransform="uppercase"
            textDecoration="underline"
            textUnderlineOffset="6px"
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
        bg={ABOUT_BG}
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
            Nancy Portugal Jamello began studying Yoga in 1968 and taught Yoga
            in the Silicon Valley from 1984 through 2020. Nancy studied with a
            variety of instructors and enjoys combining styles.
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="300"
            color="rgba(255,255,255,0.9)"
            lineHeight="2"
          >
            Nancy has extensive experience in nursing and owns a natural foods
            business. In addition to Yoga, she previously taught cardiac
            rehabilitation, senior fitness, swimming, and dance.
          </Text>

          <Box mt={{ base: "40px", md: "56px" }} px={{ base: "20px", md: "80px" }}>
            <Box h="1px" bg="rgba(255,255,255,0.35)" />
            <Flex justify="center" mt="-10px">
              <Box
                w="20px"
                h="20px"
                borderRadius="full"
                bg="rgba(255,255,255,0.22)"
                border="1px solid rgba(255,255,255,0.45)"
              />
            </Flex>
          </Box>
        </Box>
      </Box>

      {/* ─── DVDs: steel blue background ─── */}
      <Box
        id="dvds"
        pt={{ base: "40px", md: "56px" }}
        pb={{ base: "60px", md: "100px" }}
        px={{ base: "20px", md: "40px" }}
        bg={SECTION_ROSE}
      >
        <Box maxW="800px" mx="auto" textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="600"
            color="white"
            mb="16px"
          >
            Published Works
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="300"
            color="rgba(255,255,255,0.85)"
            mb="12px"
            lineHeight="1.8"
          >
            Yoga DVDs and meditation CDs can be found on YouTube in the video libraries below.
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
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="500" color="white" mb="2px">
                  {dvd.title}
                  {dvd.year && (
                    <Text as="span" fontSize="md" fontWeight="300" color="rgba(255,255,255,0.6)" ml="8px">
                      ({dvd.year})
                    </Text>
                  )}
                </Text>
                {"subtitle" in dvd && dvd.subtitle && (
                  <Text fontSize={{ base: "md", md: "lg" }} fontWeight="400" color="rgba(255,255,255,0.7)" mb="4px">
                    {dvd.subtitle}
                  </Text>
                )}
                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="300" fontStyle="italic" color="rgba(255,255,255,0.7)">
                  {dvd.description}
                </Text>
              </Box>
            ))}
          </Flex>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="300"
            color="rgba(255,255,255,0.72)"
            mt="28px"
            lineHeight="1.7"
            textAlign="center"
          >
            All Published Works are copyrighted by Nancy Portugal Jamello and may not be copied, reposted, or used without permission.
          </Text>
        </Box>
      </Box>

      {/* ─── Video libraries ─── */}
      <Box
        id="videos"
        py={{ base: "60px", md: "100px" }}
        px={{ base: "20px", md: "40px" }}
        position="relative"
        style={{
          backgroundImage: `url(${IMG("hero-meditation.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <Box maxW="1200px" mx="auto" position="relative" zIndex="1">
          <VideoSection
            requirePassword={false}
            actionLabel="Open"
            playlists={[
              {
                title: "Yoga With Nancy Jamello",
                url: "https://youtube.com/playlist?list=PLdY4OxKzOvajmsppAZqyWH_jAm2yM9pun&si=GKU9kzcp6YcYZ78g",
                backgroundImage: `${import.meta.env.BASE_URL}images/yoga-with-nancy-widget-background.png`,
                backgroundPosition: "center center",
                backgroundSize: "contain",
                backgroundMinH: "220px",
                details: [
                  "Yoga With Nancy 1 x 90min (2017)",
                  "Yoga for the Blind and Visually Impaired (2009)",
                  "Yoga With Nancy 2 x 60min (2002)",
                  "Work it Out 8 x 30min (1991)",
                ],
              },
              {
                title: "Breathing Exercises and Meditation With Nancy",
                url: "https://youtube.com/playlist?list=PLdY4OxKzOvahA4QMBBKCd73cswnCFYsWl&si=z4zZjbmHPGtOBBP3",
                backgroundImage: `${import.meta.env.BASE_URL}images/breathing-exercises-widget-background-2.png`,
                backgroundPosition: "center center",
                backgroundSize: "contain",
                backgroundMinH: "220px",
                details: [
                  "15+ Quick Exercises With Nancy (2020-)"
                ],
              },
            ]}
            excludedTitleKeywords={["ruth barati"]}
          />
          <Box h={{ base: "40px", md: "56px" }} />
          <VideoSection
            title="Ruth Barati’s Video Library"
            requirePassword={false}
            actionLabel="Open"
            prioritizedTitles={[
              "Yoga With Ruth Barati",
              "Meditation With Ruth Barati",
            ]}
            playlists={[
              {
                title: "Yoga With Ruth Barati",
                url: "https://www.youtube.com/playlist?list=PLdY4OxKzOvajNSzaxg6aECJNpcJTsGTt3",
                backgroundImage: `${import.meta.env.BASE_URL}images/ruth-barati-widget-background-2.png`,
                backgroundPosition: "center center",
                backgroundSize: "contain",
                backgroundMinH: "220px",
                details: [
                  "8 x 90min Classes with Ruth (1996)"
                ],
              },
              {
                title: "Ruth Barati's Relax and Renew Meditation - Audio",
                url: "https://youtube.com/playlist?list=PLdY4OxKzOvagluk8aaRlut0rZqxE2Iab_&si=0Zex-pRY9IJP0kjs",
                backgroundImage: `${import.meta.env.BASE_URL}images/relax-renew-widget-background-3.png`,
                backgroundPosition: "center center",
                backgroundSize: "contain",
                backgroundMinH: "220px",
                details: [
                  "3 Meditation Audio Sessions"
                ],
              },
            ]}
          />
        </Box>
      </Box>

      {/* ─── Contact + Donate ─── */}
      <Box
        py={{ base: "60px", md: "100px" }}
        px={{ base: "20px", md: "40px" }}
        bg={ABOUT_BG}
      >
        <Flex
          maxW="1000px"
          mx="auto"
          direction={{ base: "column", md: "row" }}
          gap={{ base: "40px", md: "0" }}
          align="stretch"
        >
          <Box id="contact" flex="1" textAlign="center" px={{ base: "0", md: "24px" }}>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="600"
              color="white"
              mb="16px"
            >
              Contact
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="300"
              color="rgba(255,255,255,0.85)"
              lineHeight="1.8"
              mb="24px"
            >
              <em>
                If you have yoga-related questions or would like to reach out to Nancy, please use the contact form below.
              </em>
            </Text>
            <Button
              as="a"
              href={`${import.meta.env.BASE_URL}contact.html`}
              bg="white"
              color={WINE}
              borderRadius="full"
              px="32px"
              fontWeight="500"
              _hover={{ bg: "rgba(255,255,255,0.9)", textDecoration: "none" }}
            >
              Contact
            </Button>
          </Box>

          <Box display={{ base: "block", md: "none" }} mt="40px" mb="40px" px={{ base: "20px", md: "80px" }}>
            <Box h="1px" bg="rgba(255,255,255,0.35)" />
            <Flex justify="center" mt="-10px">
              <Box
                w="20px"
                h="20px"
                borderRadius="full"
                bg="rgba(255,255,255,0.22)"
                border="1px solid rgba(255,255,255,0.45)"
              />
            </Flex>
          </Box>

          <Box display={{ base: "none", md: "flex" }} alignItems="center" justifyContent="center" px="8px">
            <Box h="140px" w="1px" bg="rgba(255,255,255,0.35)" position="relative">
              <Box
                position="absolute"
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
                w="20px"
                h="20px"
                borderRadius="full"
                bg="rgba(255,255,255,0.22)"
                border="1px solid rgba(255,255,255,0.45)"
              />
            </Box>
          </Box>

          <Box id="donate" flex="1" textAlign="center" px={{ base: "0", md: "24px" }}>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="600"
              color="white"
              mb="16px"
            >
              Donate
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="300"
              color="rgba(255,255,255,0.85)"
              lineHeight="1.8"
              mb="24px"
            >
              <em>
                Enjoy Nancy&apos;s yoga instruction? Please consider supporting by donating. Thank you.
              </em>
            </Text>
            <Button
              bg="white"
              color={WINE}
              borderRadius="full"
              px="32px"
              fontWeight="500"
              _hover={{ bg: "rgba(255,255,255,0.9)" }}
            >
              Donate
            </Button>
          </Box>
        </Flex>
      </Box>

      {/* ─── Footer ─── */}
      <Box
        py="24px"
        px="20px"
        bg="white"
        textAlign="center"
      >
        <Text fontSize="15px" fontWeight="300" color={WINE}>
          &copy; {new Date().getFullYear()} Nancy Portugal Jamello
        </Text>
      </Box>
    </Box>
  );
};

export default App;
