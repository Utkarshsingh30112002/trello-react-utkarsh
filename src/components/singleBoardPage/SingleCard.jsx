import { Text, Box, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import CardPage from "../../pages/CardPage";
import { useState } from "react";
import { toast } from "react-toastify";
import { delACardUrl } from "../../utility/apiUrl";

const SingleCard = ({ card,relode}) => {
  const [open, setOpen] = useState(false);

  async function delteHandler() {
    const confirm = window.confirm(
      "Are you sure you want to delete this Card?"
    );
    if (!confirm) return;
    const url = delACardUrl(card.id);
    await axios.delete(url);
    toast.success("Card Deleted SuccessFully");
    relode()
  }
  function redirect() {
    setOpen(true);
  }

  return (
    <Box my="2px" bg="#22272B" rounded="sm" display="flex">
      <CardPage
        open={open}
        setOpen={setOpen}
        cardId={card.id}
      />
      <Box onClick={redirect} display="flex" alignItems="center">
        <Text color="white" pl="5px">
          {card.name}
        </Text>
      </Box>
      <Box flexGrow="1" onClick={redirect}></Box>
      <IconButton
        variant="ghost"
        size="xs"
        color="white"
        onClick={delteHandler}
      >
        <FaTrash />
      </IconButton>
    </Box>
  );
};

export default SingleCard;
