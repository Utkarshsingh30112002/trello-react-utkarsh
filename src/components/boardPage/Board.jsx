import {Card} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Board = ({curr}) => {
  return (
    <Link to={`/boards/${curr.id}`}>
    <Card.Root w="300px" h="100px" bg="#0067A3">
      <Card.Title m="2">{curr.name}</Card.Title>
    </Card.Root>
  </Link>
  )
}

export default Board