import { Text, Box, IconButton, Spinner } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import CardPage from "../../pages/CardPage";
import { useState } from "react";
import useGet from "../customHooks/useGet";
import { toast } from "react-toastify";
import { delACardUrl, getACardUrl } from "../../utility/apiUrl";

const SingleCard = ({ cardId, setRelode }) => {
  const [open, setOpen] = useState(false);
  const [cardRelode, setCardRelode] = useState(false);
  const getCardUrl = getACardUrl(cardId);
  const res = useGet(getCardUrl, cardRelode);
  const card = res.data;
  const loading = res.loading;

  async function delteHandler() {
    const confirm = window.confirm(
      "Are you sure you want to delete this Card?"
    );
    if (!confirm) return;
    const url = delACardUrl(card.id);
    await axios.delete(url);
    toast.success("Card Deleted SuccessFully");
    setRelode((prev) => !prev);
  }
  function redirect() {
    setOpen(true);
  }

  return (
    <Box my="2px" bg="#22272B" rounded="sm" display="flex">
      <CardPage
        open={open}
        setOpen={setOpen}
        card={card}
        relode={cardRelode}
        setRelode={setCardRelode}
        loading={loading}
      />
      <Box onClick={redirect} display="flex" alignItems="center">
        <Text color="white" pl="5px">
          {loading ? <Spinner /> : card.name}
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
