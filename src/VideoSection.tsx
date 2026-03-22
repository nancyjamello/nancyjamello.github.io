import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Input, Text, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";

// SHA-256 hash of the password.
// To generate: open browser console and run  sha256("yourpassword")  then paste the result here.
const PASSWORD_HASH =
  "ae7288062a7e775999f255fff3839b585a927424e29d15453d75d8605652dc84";

const MAX_ATTEMPTS = 5;
const CHANNEL_ID = "UCSPqoFbGujWgDnr_m36zjMw"; // @NancyJamello
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CORS_PROXIES = [
  (url: string) =>
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

// SHA-256 helper — exposed on window so devs can generate hashes from the console
async function sha256(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
(window as any).sha256 = sha256;

interface YouTubeVideo {
  videoId: string;
  title: string;
  published: string;
  thumbnail: string;
}

function parseRss(xml: string): YouTubeVideo[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const entries = doc.querySelectorAll("entry");
  const videos: YouTubeVideo[] = [];

  entries.forEach((entry) => {
    const videoId = entry.querySelector("videoId")?.textContent ?? "";
    const title = entry.querySelector("title")?.textContent ?? "";
    const published = entry.querySelector("published")?.textContent ?? "";
    const thumbnail =
      entry.querySelector("thumbnail")?.getAttribute("url") ??
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

    if (videoId && title) {
      videos.push({ videoId, title, published, thumbnail });
    }
  });

  return videos;
}

const VideoSection = () => {
  // gate state
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
  const [locked, setLocked] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusColor, setStatusColor] = useState("#c0392b");
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // video state
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // close fullscreen overlay on Escape
  useEffect(() => {
    if (!activeVideo) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [activeVideo]);

  const fetchVideos = async () => {
    setLoading(true);
    for (const proxy of CORS_PROXIES) {
      try {
        const res = await fetch(proxy(RSS_URL));
        if (res.ok) {
          const xml = await res.text();
          const parsed = parseRss(xml);
          if (parsed.length > 0) {
            setVideos(parsed);
            break;
          }
        }
      } catch {
        /* try next proxy */
      }
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (locked || !password.trim()) return;
    const hash = await sha256(password);

    if (hash === PASSWORD_HASH) {
      setStatusMsg("Access granted");
      setStatusColor("#94a7ab");
      setTimeout(() => {
        setUnlocked(true);
        fetchVideos();
      }, 400);
    } else {
      const remaining = attempts - 1;
      setAttempts(remaining);
      setPassword("");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);

      if (remaining <= 0) {
        setLocked(true);
        setStatusMsg("Too many failed attempts. Access locked.");
      } else {
        setStatusMsg(
          `Incorrect password. ${remaining} attempt${
            remaining !== 1 ? "s" : ""
          } remaining.`
        );
      }
      setStatusColor("#c0392b");
      inputRef.current?.focus();
    }
  };

  return (
    <>
      {/* ── Fullscreen video overlay ── */}
      {activeVideo && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="rgba(0,0,0,0.95)"
          zIndex="2000"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            as="button"
            position="absolute"
            top="16px"
            right="24px"
            bg="transparent"
            border="none"
            color="white"
            fontSize="2xl"
            cursor="pointer"
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
            style={{ fontFamily: "inherit" }}
          >
            ✕
          </Box>
          <Box w="92vw" h="80vh" maxW="1400px">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{ borderRadius: "8px" }}
            />
          </Box>
        </Box>
      )}

      {/* ── Section heading ── */}
      <Text
        fontSize="xs"
        fontWeight="500"
        letterSpacing="0.2em"
        color="#999"
        textTransform="uppercase"
        mb="12px"
        textAlign="center"
      >
        Watch
      </Text>
      <Heading
        as="h2"
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="600"
        color="#2d2d2d"
        mb="8px"
        textAlign="center"
      >
        Video Library
      </Heading>
      <Text
        fontSize="sm"
        fontWeight="300"
        color="#6b6560"
        textAlign="center"
        mb="40px"
      >
        {unlocked
          ? "Click any video to watch. Use the fullscreen button for native fullscreen."
          : "Enter your password to access the video collection."}
      </Text>

      {/* ── Password gate ── */}
      {!unlocked && (
        <Box maxW="400px" mx="auto" textAlign="center">
          <Box className={shaking ? "shake" : undefined} mb="16px">
            <Box position="relative">
              <Input
                ref={inputRef}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter") handleSubmit();
                }}
                disabled={locked}
                style={{
                  paddingRight: "70px",
                  height: "48px",
                  fontSize: "16px",
                  borderColor: "#e8e4df",
                  borderRadius: "6px",
                  width: "100%",
                  border: "1px solid #e8e4df",
                  paddingLeft: "16px",
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
              <Box
                position="absolute"
                right="8px"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={locked}
                  style={{
                    fontSize: "12px",
                    color: "#6b6560",
                    fontFamily: "inherit",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </Box>
            </Box>
          </Box>

          <Button
            onClick={handleSubmit}
            disabled={locked || !password.trim()}
            style={{
              width: "100%",
              height: "48px",
              backgroundColor: "#2d2d2d",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "400",
              cursor: "pointer",
              fontFamily: "inherit",
              marginBottom: "16px",
            }}
          >
            Unlock
          </Button>

          {statusMsg && (
            <Text fontSize="sm" fontWeight="400" color={statusColor}>
              {statusMsg}
            </Text>
          )}
        </Box>
      )}

      {/* ── Video grid (only rendered after unlock) ── */}
      {unlocked && (
        <Box className="fade-in">
          {loading ? (
            <Box display="flex" justifyContent="center" py="60px">
              <Spinner size="lg" color="#2d2d2d" />
            </Box>
          ) : videos.length === 0 ? (
            <Text color="#6b6560" textAlign="center" py="60px">
              No videos found.
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="20px">
              {videos.map((video) => (
                <Box
                  key={video.videoId}
                  bg="white"
                  borderRadius="md"
                  border="1px solid #e8e4df"
                  overflow="hidden"
                  cursor="pointer"
                  onClick={() => setActiveVideo(video.videoId)}
                  transition="transform 0.2s, box-shadow 0.2s"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <Box position="relative" paddingTop="56.25%">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {/* play icon overlay */}
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      bg="rgba(0,0,0,0.5)"
                      borderRadius="full"
                      w="44px"
                      h="44px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box
                        w="0"
                        h="0"
                        borderLeft="14px solid white"
                        borderTop="9px solid transparent"
                        borderBottom="9px solid transparent"
                        ml="3px"
                      />
                    </Box>
                  </Box>

                  <Box p="12px">
                    <Text
                      fontWeight="500"
                      color="#2d2d2d"
                      fontSize="sm"
                      lineClamp={2}
                    >
                      {video.title}
                    </Text>
                    {video.published && (
                      <Text color="#aaa" fontSize="xs" mt="4px">
                        {new Date(video.published).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Text>
                    )}
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      )}
    </>
  );
};

export default VideoSection;
