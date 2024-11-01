import { useEffect, useState } from "react";
import useGet from "../customHooks/useGet";
import { Box, Heading, HStack, Progress, Stack, Text ,Grid,GridItem, Button, IconButton, Spacer } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox"
import {
    ProgressBar,
    ProgressLabel,
    ProgressRoot,
  } from "@/components/ui/progress"
import {FaTrash} from 'react-icons/fa'
import { Editable} from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"
import {FaPlus} from 'react-icons/fa'
import { CiTrash } from "react-icons/ci";
import {toast} from 'react-toastify'


const SingleChecklist = ({ id ,relode,delCheckList,cardId}) => {
  const [relodeData,setRelodeData]=useState(true)
  const apikey = import.meta.env.VITE_API_KEY;
  const apiToken = import.meta.env.VITE_API_TOKEN;
  const url = `https://api.trello.com/1/checklists/${id}?key=${apikey}&token=${apiToken}`;
  const checklist = useGet(url,relodeData);
  const loading = checklist.loading;
  const title = loading ? "" : checklist.data.name || "";
  const items = loading ? [] : checklist.data.checkItems || [];
  const [name, setName] = useState('');
  
  
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    if (!loading ) {
      setCheckedItems(items.map((item) => ({ ...item,checked:(item.state=='complete'?true:false)})));
    }
  }, [items]);

  const toggleCheck = async (index,checkItemId) => {
    let state=''
    const updatedItems = checkedItems.map((item, idx) =>{

      if(idx===index){
        if(item.checked)state='incomplete'
        else state='complete'
        return { ...item, checked: !item.checked }
      }
      else return item}
    );
    let updateUrl=`https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${apikey}&token=${apiToken}&state=${state}`
    await axios.put(updateUrl);
    setCheckedItems(updatedItems);
  };

  const progress =(checkedItems.filter((item) => item.checked).length / checkedItems.length) *
    100;
  async function addCheckItem(){
      if(!name.trim()){
        setName('')
        return;
      }
       const createUrl=`https://api.trello.com/1/checklists/${id}/checkItems?name=${name}&key=${apikey}&token=${apiToken}`
       await axios.post(createUrl);
       toast.success('CheckItem created SuccessFully')
       setRelodeData(prev=>!prev)
       setName('')
     }


  async function delCheckItem(itemId){
    const confirm = window.confirm('Are you sure you want to delete this CheckItem?')
      if(!confirm)return ;
    let delUrl=`https://api.trello.com/1/checklists/${id}/checkItems/${itemId}?key=${apikey}&token=${apiToken}`
    await axios.delete(delUrl)
    toast.success('CheckItem Deleted SuccessFully')
    setRelodeData(prev=>!prev);
  }
  
  return (
    <Box w="100%" p={4} bg="gray.700" rounded="md" color="white">
      {/* <Progress value={progress || 0} colorScheme="green" mb="4" rounded="sm" /> */}
      <ProgressRoot  value={progress || 0} colorPalette='gray' mb="4" rounded="sm" variant="subtle" size='xs'>
        <HStack>
        <Heading size="md" mb="4">{title}</Heading><Spacer/> <IconButton size='xs' bg='gray.700' onClick={()=>delCheckList(checklist.data.id)}><FaTrash /></IconButton></HStack>
        <ProgressBar maxWidth='450px'/>
      </ProgressRoot>
    
      <Stack spacing="3">
       {loading?'loading':checkedItems.map((item, index) => 
         (
          <Box display='flex' w={'100%'} gap='20px' alignItems='center' key={item.id}>
            <Checkbox
            
            checked={item.checked}
            onChange={() => toggleCheck(index,item.id)}
            colorScheme="green"
            >
            </Checkbox>
            
            <Text as={item.checked ? "s" : "span"}>{item.name}</Text>
            <Box flexGrow={1}></Box>
            <IconButton size='xs' bg='gray.700' onClick={()=>delCheckItem(item.id)}><CiTrash/></IconButton>
            </Box>

        )
    )}
    <Editable.Root  bg='#22272B' color='white' onValueChange={(e)=>setName(e.value)} onValueCommit={addCheckItem} value={name}>
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
      </Stack>
    </Box>
  );
};

export default SingleChecklist;
