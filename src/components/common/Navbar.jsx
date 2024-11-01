import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      bg="#1D2125"
      justify="center"
      p="1px"
      borderBottom="0.5px solid white"
      mb="20px"
    >
      <Link to="/">
        <Button
          bg="#1D2125"
          color="gray.300"
          _hover={{ bg: "gray.600" }}
          fontSize="2xl"
        >
          Trello
        </Button>
      </Link>
    </Flex>
  );
};

export default Navbar;
