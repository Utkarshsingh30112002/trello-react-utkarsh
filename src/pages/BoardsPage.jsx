

import { SimpleGrid, Text ,Card, CardHeader} from '@chakra-ui/react';



import { useEffect, useState } from 'react'
import PopupForm from '../components/common/PopupForm';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';



const Boards = () => {
    const [boards,setBoards]=useState([]);
    const [refresh,setRefresh]=useState(false)
    const apikey=import.meta.env.VITE_API_KEY;
    const apiToken=import.meta.env.VITE_API_TOKEN

    useEffect(()=>{
        async function fn(){
            const data= await axios.get(`https://api.trello.com/1/members/me/boards?key=${apikey}&token=${apiToken}`)
            setBoards(data.data);
        }
        fn()
    },[refresh])

    
     
    async function addBoard(name){
        if(!name)return;
        await axios.post(`https://api.trello.com/1/boards/?name=${name}&key=${apikey}&token=${apiToken}`)
        toast.success('Board Created SuccessFully')
        setRefresh((prev)=>!prev);
    }

  return (

    
    <SimpleGrid minChildWidth='300px' gap='10px' m='5px' >
        {boards.map((curr,i)=>(
            <Link key={i} to={`/boards/${curr.id}`} >
            <Card.Root  w='300px' h='100px' bg='#0067A3'>
                <Card.Title mt="2" >{curr.name}</Card.Title>
            </Card.Root></Link>
        )
        )}
        <Card.Root w='300px' h='100px' bg='#0067A3'>
                <PopupForm addBoard={addBoard} title={'Add Button'}/>
            </Card.Root>

    
        
    </SimpleGrid>
  )
}

export default Boards

