import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import VideoModal from "./VideoModal";

interface VideoSummaryProps {
  index: number; // The videoindex prop is a number
}

const VideoSummary = (props: VideoSummaryProps) => {
  return (
    <Box alignItems="center" justifyContent="center" w="95%">
      <Card
        direction={{ base: "column", sm: "row" }}
        maxW="100%"
        overflow="hidden"
        variant="outline"
        paddingX="5%"
        background="white"
      >
        <Stack>
          <CardBody>
            <Heading size="md">Hatha Yoga Class 1</Heading>

            <Text py="2">
              Join me for a relaxing and rejuvenating hatha yoga class, where we
              will practice breathing techniques and yoga poses to balance our
              body and mind. Hatha yoga is a type of yoga that combines physical
              postures and breathwork to channel vital energy. In this class, we
              will move through a series of asanas at a slow pace, focusing on
              proper alignment and awareness. Whether you are new to yoga or a
              seasoned practitioner, this class will help you feel calm, strong,
              and flexible. Namaste!
            </Text>
          </CardBody>

          <CardFooter>
            <VideoModal videoindex={props.index} />
          </CardFooter>
        </Stack>
        <Image
          objectFit="cover"
          maxW={{ base: "50%", sm: "400px" }}
          src="./ytn.jpeg"
          alt="Woman Doing Yoga"
        />
      </Card>
    </Box>
  );
};

export default VideoSummary;
