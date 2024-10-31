import { Box, Button, Card,Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import PopupMenu from './PopupMenu'
import useGet from '../customHooks/useGet'
import {FaPlus} from 'react-icons/fa'
import { Editable, IconButton } from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"
import SingleBoard from '../../pages/SingleBoardPage'
import SingleCard from './SingleCard'

const List = ({curr,archiveList}) => {
    const [name, setName] = useState('');
    const [relode,setRelode]=useState(true)
    const apikey=import.meta.env.VITE_API_KEY;
    const apiToken=import.meta.env.VITE_API_TOKEN
    const cardsUrl=`https://api.trello.com/1/lists/${curr.id}/cards?key=${apikey}&token=${apiToken}`
    const allCards=useGet(cardsUrl,relode);

    async function addCard(){
     if(!name.trim()){
       setName('')
       return;
     }
      const createUrl=`https://api.trello.com/1/cards?idList=${curr.id}&key=${apikey}&token=${apiToken}&name=${name}`
      await axios.post(createUrl);
      setName('')
      setRelode(prev=>!prev)
    }

  return (
    <Card.Root w='300px'  bgColor='black' color='white' alignSelf='start'>
            <Card.Title m="2"  ><Box display='flex' justifyContent='space-between'>{curr.name}<PopupMenu id={curr.id} deleteFn={archiveList} /></Box></Card.Title>
        <Card.Body>
          {allCards.data.map((card,i)=><SingleCard key={i} cardId={card.id} setRelode={setRelode}/>)}
        </Card.Body>
            {/* <Card.Footer><Button pr='59%' bg='black' _hover={{bg:'gray.800'} }><FaPlus/> Add Card</Button></Card.Footer> */}
       <Card.Footer>
            <Editable.Root  bg='#22272B' color='white' onValueChange={(e)=>setName(e.value)} onValueCommit={addCard} value={name}>
      <Editable.Preview />
      <Editable.Input />
      <Editable.Control>
        <Editable.EditTrigger asChild>
          <IconButton variant="ghost" size="xs" color='white'>
           <FaPlus/> Add Card
          </IconButton>
        </Editable.EditTrigger>
        
        <Editable.CancelTrigger asChild>
          <IconButton variant="outline" size="xs" color='white'>
            <LuX />
          </IconButton>
        </Editable.CancelTrigger>
        <Editable.SubmitTrigger asChild>
          <IconButton variant="outline" size="xs" color='white'>
            <LuCheck />
          </IconButton>
        </Editable.SubmitTrigger>
       
      </Editable.Control>
    </Editable.Root>
            </Card.Footer>
    </Card.Root>
  )
}

export default List