import { SimpleGrid, Card, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import PopupForm from "../components/common/PopupForm";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useGet from "../components/customHooks/useGet";
import { boardAddUrl, boardsGetUrl } from "../utility/apiUrl";

const Boards = () => {
  const [refresh, setRefresh] = useState(false);
  const data = useGet(boardsGetUrl(), refresh);
  const boards = data.data || [];

  async function addBoard(name) {
    if (!name) return;
    await axios.post(boardAddUrl(name));
    toast.success("Board Created SuccessFully");
    setRefresh((prev) => !prev);
  }
  console.log(boards);

  return (
    <SimpleGrid minChildWidth="300px" gap="10px" m="5px" placeItems="center">
      {data.loading ? (
        <Spinner size="xl" />
      ) : (
        boards.map((curr, i) => (
          <Link key={i} to={`/boards/${curr.id}`}>
            <Card.Root w="300px" h="100px" bg="#0067A3">
              <Card.Title mt="2">{curr.name}</Card.Title>
            </Card.Root>
          </Link>
        ))
      )}
      <Card.Root w="300px" h="100px" bg="#0067A3">
        <PopupForm addBoard={addBoard} title={"Add Board"} />
      </Card.Root>
    </SimpleGrid>
  );
};

export default Boards;
