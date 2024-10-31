import { Text,Box, IconButton, Center} from "@chakra-ui/react"
import { FaTrash } from "react-icons/fa"
import CardPage from "../../pages/CardPage";
import { useState } from "react";
import useGet from "../customHooks/useGet";

const SingleCard = ({cardId,setRelode}) => {
    const apikey=import.meta.env.VITE_API_KEY;
    const apiToken=import.meta.env.VITE_API_TOKEN
    const [open, setOpen] = useState(false)
    const[cardRelode,setCardRelode]=useState(false)
    const getCardUrl=`https://api.trello.com/1/cards/${cardId}?key=${apikey}&token=${apiToken}`
    const res=useGet(getCardUrl,cardRelode);
    const card=res.data;
    const loading=res.loading;
    console.log(card);

    async function delteHandler(){
        const url=`https://api.trello.com/1/cards/${card.id}?key=${apikey}&token=${apiToken}`
        await axios.delete(url)
        setRelode(prev=>!prev)
    }
    function redirect(){
        setOpen(true);
    }

  return (
    
    <Box my='2px' bg='#22272B' rounded='sm' display='flex'>
      <CardPage open={open} setOpen={setOpen} card={card} relode={cardRelode} setRelode={setCardRelode} loading={loading}/>
      <Box onClick={redirect} display='flex' alignItems='center'><Text color='white' pl='5px'>{loading?'loading':card.name}</Text></Box>
      <Box flexGrow='1' onClick={redirect}></Box>
      <IconButton variant="ghost" size="xs" color='white'  onClick={delteHandler} >
           <FaTrash/>
      </IconButton>
    </Box>
   
  )
}

export default SingleCard