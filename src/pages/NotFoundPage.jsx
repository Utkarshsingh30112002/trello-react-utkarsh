import { Link } from "react-router-dom";
import { Box, Text, Heading, IconButton } from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="90vh"
      color={["gray.800", "white"]}
      textAlign="center"
    >
      <IconButton
        icon={<FaExclamationTriangle />}
        aria-label="Error Icon"
        fontSize="6xl"
        color="yellow.400"
        mb={4}
        variant="unstyled" // No button styling
      />
      <Heading as="h1" size="4xl" mb={4}>
        404 Not Found
      </Heading>
      <Text fontSize="xl" mb={5}>
        This page does not exist
      </Text>
      <Link
        to="/"
        style={{
          textDecoration: "none", // Remove underline
        }}
      >
        <Box
          bg="blue.500" // Background color
          color="white" // Text color
          px={3}
          py={2}
          borderRadius="md"
          mt={4}
          boxShadow="md"
          _hover={{ bg: "blue.600" }} // Change background on hover
        >
          Go Back
        </Box>
      </Link>
    </Box>
  );
};

export default NotFoundPage;
