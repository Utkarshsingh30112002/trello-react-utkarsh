import {useState} from 'react'
import { useParams } from 'react-router-dom'
import useGet from '../components/customHooks/useGet';
import { Box, SimpleGrid,Card, HStack,Grid,Editable, IconButton } from '@chakra-ui/react';
import { IoMdMenu } from "react-icons/io";
    import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"
import PopupMenu from '../components/common/PopupMenu';
import List from '../components/common/List';
import { toast } from 'react-toastify';

const SingleBoard = () => {
    const [reloadData, setReloadData] = useState(false);
    const {id}=useParams();
    const apikey=import.meta.env.VITE_API_KEY;
    const apiToken=import.meta.env.VITE_API_TOKEN
    const url=`https://api.trello.com/1/boards/${id}/lists?key=${apikey}&token=${apiToken}`;
    const {data,loading}=useGet(url,reloadData);
    const [value,setValue]=useState('Create List')
    async function addList(){
        const postUrl = `https://api.trello.com/1/lists?name=${value}&idBoard=${id}&key=${apikey}&token=${apiToken}`;
        try {
          await axios.post(postUrl); 
          toast.success('List Created SuccessFully')
          setValue('Create List'); 
          setReloadData((prev)=>!prev)
        } catch (error) {
          console.error("Error creating list:", error);
        }
    }
    async function archiveList(id){
      const confirm = window.confirm('Are you sure you want to delete this List?')
      if(!confirm)return ;
      const archiveUrl=`https://api.trello.com/1/lists/${id}/closed?key=${apikey}&token=${apiToken}&value=true`
      await axios.put(archiveUrl);
      toast.success('List Deleted SuccessFully')
      setReloadData((prev)=>!prev);
    }

    
  return (
    
    <Grid bg='blue.400' h='100vh' alignItems='start' overflowX="auto" overflow='auto'>
    <HStack>
    {loading?'loading':data.map((curr,i)=>(
        <List curr={curr} key={i} archiveList={archiveList} />
    )
    )}
    <Card.Root w='300px'  bgColor='black' color='white' alignSelf='start'>
    <Editable.Root defaultValue={value} value={value} onValueCommit={addList} onValueChange={(e)=>setValue(e.value)}>
      <Editable.Preview />
      <Editable.Input h='100px' m='1'/>
      <Editable.Control>
        <Editable.EditTrigger asChild>
          <IconButton variant="ghost" size="xs">
            <LuPencilLine color='white' />
          </IconButton>
        </Editable.EditTrigger>
        <Editable.CancelTrigger asChild>
          <IconButton variant="outline" size="xs" color='white'>
            <LuX color='white'/>
          </IconButton>
        </Editable.CancelTrigger>
        <Editable.SubmitTrigger asChild >
          <IconButton variant="outline" size="xs" color='white'>
            <LuCheck color='white'/>
          </IconButton>
        </Editable.SubmitTrigger>
      </Editable.Control>
    </Editable.Root>
    </Card.Root>
    </HStack>
    </Grid>
  
  )
}

export default SingleBoard