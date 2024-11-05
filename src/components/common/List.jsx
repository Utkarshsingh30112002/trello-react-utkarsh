import { Box, Card } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { Editable, IconButton } from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import { toast } from "react-toastify";
import { useState } from "react";

import { addCardUrl, allCardsInListUrl } from "../../utility/apiUrl";
import SingleCard from "./SingleCard";import PopupMenu from "./PopupMenu";
import useGet from "../customHooks/useGet";

const List = ({ curr, archiveList }) => {
  const [name, setName] = useState("");
  const [relode, setRelode] = useState(true);
  const cardsUrl = allCardsInListUrl(curr.id);
  const allCards = useGet(cardsUrl, relode);

  async function addCard() {
    if (!name.trim()) {
      setName("");
      return;
    }
    const createUrl = addCardUrl(name, curr.id);
    await axios.post(createUrl);
    setName("");
    setRelode((prev) => !prev);

    toast.success("Card Created SuccessFully");
  }

  return (
    <Card.Root w="300px" bgColor="black" color="white" alignSelf="start">
      <Card.Title m="2">
        <Box display="flex" justifyContent="space-between">
          {curr.name}
          <PopupMenu id={curr.id} deleteFn={archiveList} />
        </Box>
      </Card.Title>
      <Card.Body>
        {allCards.data.map((card, i) => (
          <SingleCard key={i} cardId={card.id} setRelode={setRelode} />
        ))}
      </Card.Body>
      <Card.Footer>
        <Editable.Root
          color="white"
          onValueChange={(e) => setName(e.value)}
          onValueCommit={addCard}
          value={name}
          submitMode="enter"
        >
          <Editable.Preview />
          <Editable.Input />
          <Editable.Control>
            <Editable.EditTrigger asChild>
              <IconButton
                variant="ghost"
                size="xs"
                color="white"
                bg="#22272B"
                px="10px"
              >
                <FaPlus /> Add Card
              </IconButton>
            </Editable.EditTrigger>

            <Editable.CancelTrigger asChild>
              <IconButton variant="outline" size="xs" color="white">
                <LuX />
              </IconButton>
            </Editable.CancelTrigger>
            <Editable.SubmitTrigger asChild>
              <IconButton variant="outline" size="xs" color="white">
                <LuCheck />
              </IconButton>
            </Editable.SubmitTrigger>
          </Editable.Control>
        </Editable.Root>
      </Card.Footer>
    </Card.Root>
  );
};

export default List;
