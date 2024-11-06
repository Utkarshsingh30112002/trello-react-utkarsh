import { Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaRegClock } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchBoards } from "../redux/slices/boardsSlice";
import { boardAddUrl, boardsGetUrl } from "../utility/apiUrl";
import SearchAndSort from "../components/boardPage/SearchAndSort";
import GridLayout from "../components/boardPage/GridLayout";


const Boards = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.boards);
  const navigate = useNavigate();

  useEffect(() => {
    const url=boardsGetUrl()
    dispatch(fetchBoards(url));
  }, []);

  if (error) {
    navigate(`./${error}`);
  }

  async function addBoard(name) {
    if (!name) return;
    await axios.post(boardAddUrl(name));
    toast.success("Board Created SuccessFully");
    dispatch(fetchBoards(boardsGetUrl()));
  }

  return (
    <>
      <Heading size="lg" mb="4" color="whiteAlpha.700" ml="5">
        <HStack>
          <FaRegClock />
          Recent Boards
        </HStack>
      </Heading>
      <GridLayout addBoard={addBoard} Notrecent={false} />
      <Heading size="lg" mb="4" color="whiteAlpha.700" ml="5">
        All Boards
      </Heading>
      <SearchAndSort />
      <GridLayout addBoard={addBoard} Notrecent={true} />
    </>
  );
};

export default Boards;
