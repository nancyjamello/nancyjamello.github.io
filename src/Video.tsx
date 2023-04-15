import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

// Define an interface for the props of the VideoPlayer component
interface VideoProps {
  url: string; // The videoindex prop is a number
}

// Define a type guard function that checks if the url starts with http
function isValidUrl(url: string | null): url is string {
  return !!url && url.startsWith("http");
}

const Video = () => {
  const location = useLocation(); // get the location object
  const searchParams = new URLSearchParams(location.search); // parse the search string
  let value: string = searchParams.get("url") || ""; // get the url parameter value

  // Use a state variable to store the error message
  const [error, setError] = useState<string>("");

  // Use a state variable to store the url value
  const [url, setUrl] = useState<string>("invalid password");

  // Use a useEffect hook to validate the url and set the error message
  useEffect(() => {
    let validValue: boolean | null = isValidUrl(value); // get the value from somewhere
    let flag: boolean = validValue || false;

    if (flag) {
      setUrl(value); // set the url value if valid
      setError(""); // clear the error message if valid
    } else {
      setError("Invalid url format"); // set the error message if invalid
    }
  }, [value]); // use value as a dependency

  useEffect(() => {
    console.log("MyComponent is created"); // log a message
    console.log({url}); // log the props object
  }, ); // empty dependency array

  return (
    <Box
      as="main"
      w="calc(100vw)"
      h="calc(100vh)"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {error ? (
        <Text color="red">{error}</Text> // display the error text if present
      ) : (
        <iframe
          src={url}
          width="calc(100vw)"
          height="calc(100vh)"
          allow="autoplay"
        ></iframe>
      )}
    </Box>
  );
};

export default Video;