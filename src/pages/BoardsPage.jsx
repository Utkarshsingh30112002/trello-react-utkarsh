import { Heading, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaRegClock } from "react-icons/fa6";

import useGet from "../components/customHooks/useGet";
import { boardAddUrl, boardsGetUrl } from "../utility/apiUrl";
import SearchAndSort from "../components/boardPage/SearchAndSort";
import GridLayout from "../components/boardPage/GridLayout";

const Boards = () => {
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const data = useGet(boardsGetUrl(), refresh);
  let boards = data.data || [];
  const [sortBy, setSortBy] = useState(false);

  async function addBoard(name) {
    if (!name) return;
    await axios.post(boardAddUrl(name));
    toast.success("Board Created SuccessFully");
    setRefresh((prev) => !prev);
  }

  const recentBoards = boards
    .filter((board) => !board.closed)
    .sort((a, b) => new Date(b.dateLastView) - new Date(a.dateLastView))
    .slice(0, 5);

  let sortedBoards = boards
    .filter((curr) => curr.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let aName = a.name.toLowerCase();
      let bName = b.name.toLowerCase();
      if (aName < bName) return sortBy == "Z-A" ? 1 : -1;
      if (bName < aName) return sortBy == "A-Z" ? -1 : 1;
      else return 0;
    });

  return (
    <>
      <Heading size="lg" mb="4" color="whiteAlpha.700" ml="5">
        <HStack>
          <FaRegClock />
          Recent Boards
        </HStack>
      </Heading>
      <GridLayout
        loading={data.loading}
        data={recentBoards}
        addBoard={addBoard}
        Notrecent={false}
      />
      <Heading size="lg" mb="4" color="whiteAlpha.700" ml="5">
        All Boards
      </Heading>
      <SearchAndSort
        sortBy={sortBy}
        setSortBy={setSortBy}
        search={search}
        setSearch={setSearch}
      />
      <GridLayout
        loading={data.loading}
        data={sortedBoards}
        addBoard={addBoard}
        Notrecent={true}
      />
    </>
  );
};

export default Boards;
