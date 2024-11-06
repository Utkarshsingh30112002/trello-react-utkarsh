import { SimpleGrid, Spinner } from "@chakra-ui/react";
import React from "react";
import AddBoard from "./AddBoard";
import Board from "./Board";
import { useSelector } from "react-redux";
import {
  selectRecent,
  selectSearchAndSortBy,
} from "../../redux/slices/boardsSlice";

const GridLayout = ({ addBoard, Notrecent }) => {
  let { loading } = useSelector((state) => state.boards);
  const data = Notrecent
    ? useSelector(selectSearchAndSortBy)
    : useSelector(selectRecent);

  return (
    <SimpleGrid
      minChildWidth="300px"
      gap="10px"
      m="5px"
      placeItems="center"
      pb="10"
    >
      {loading ? (
        <Spinner size="xl" />
      ) : (
        data.map((curr) => <Board key={curr.id} curr={curr} />)
      )}
      {Notrecent && <AddBoard addBoard={addBoard} />}
    </SimpleGrid>
  );
};

export default GridLayout;
