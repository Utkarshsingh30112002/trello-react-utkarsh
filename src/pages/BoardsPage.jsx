import { SimpleGrid, Card, Spinner,Box ,Heading, HStack,Input, Spacer} from "@chakra-ui/react";
import { useState } from "react";
import PopupForm from "../components/common/PopupForm";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useGet from "../components/customHooks/useGet";
import { boardAddUrl, boardsGetUrl } from "../utility/apiUrl";
import { FaRegClock } from "react-icons/fa6";
import {NativeSelectField,NativeSelectRoot} from "@/components/ui/native-select"
const Boards = () => {
  const [refresh, setRefresh] = useState(false);
  const [search,setSearch]=useState('');
  const data = useGet(boardsGetUrl(), refresh);
  let boards = data.data || [];
  const [sortBy,setSortBy]=useState(false)

  async function addBoard(name) {
    if (!name) return;
    await axios.post(boardAddUrl(name));
    toast.success("Board Created SuccessFully");
    setRefresh((prev) => !prev);
  }
  
  const recentBoards = boards
    .filter(board => !board.closed)
    .sort((a, b) => new Date(b.dateLastView) - new Date(a.dateLastView))
    .slice(0, 5);
  
  let sortedBoards=boards.filter((curr)=>(curr.name.toLowerCase().includes(search.toLowerCase()))).sort((a,b)=>{
      let aName=a.name.toLowerCase()
      let bName=b.name.toLowerCase()
      if(aName<bName)return sortBy=='Z-A'?1:-1;
      if(bName<aName)return sortBy=='A-Z'?-1:1;
      else return 0;
    })
  
 

  return (
    <>
    <Box mb="8">
        <Heading size="lg" mb="4" color='whiteAlpha.700' ml='5'><HStack><FaRegClock/>Recent Boards</HStack></Heading>
        <SimpleGrid minChildWidth="300px" gap="10px" m="5px" placeItems="center">
          {recentBoards.length === 0 ? (
            <Box>No recent boards available.</Box>
          ) : (
            recentBoards.map((curr, i) => (
             
              <Link key={i} to={`/boards/${curr.id}`}>
               <Card.Root w="300px" h="100px" bg="#0067A3">
                <Card.Title m="2">{curr.name}</Card.Title>
               </Card.Root>
              </Link>
             
            ))
          )}
        </SimpleGrid>
      </Box>
    <Heading size="lg" mb="4" color='whiteAlpha.700' ml='5'>All Boards</Heading>
    <HStack mb="10px" gap="10px" mx='5'>
        <NativeSelectRoot
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          width="150px"
          color='whiteAlpha.700'
        >
          <NativeSelectField>
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
          </NativeSelectField>
        </NativeSelectRoot>

        
        <Input
          w='200px'
          placeholder="Search boards"
          color='whiteAlpha.700'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </HStack>
    <SimpleGrid minChildWidth="300px" gap="10px" m="5px" placeItems="center" pb='60'>

      {data.loading ? (
        <Spinner size="xl" />
      ) : (
        sortedBoards.map((curr, i) => (
          <Link key={i} to={`/boards/${curr.id}`}>
            <Card.Root w="300px" h="100px" bg="#0067A3">
              <Card.Title m="2">{curr.name}</Card.Title>
            </Card.Root>
          </Link>
        ))
      )}
      <Card.Root w="300px" h="100px" bg="#0067A3">
        <PopupForm addBoard={addBoard} title={"Add Board"} />
      </Card.Root>
    </SimpleGrid>
    </>
  );
};

export default Boards;
