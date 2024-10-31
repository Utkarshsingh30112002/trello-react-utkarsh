"use client"

import { Button } from "@/components/ui/button"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Grid,GridItem  } from "@chakra-ui/react"
import SingleChecklist from "../components/common/SingleChecklist"
import PopupForm from "../components/common/PopupForm"
import { useState } from "react"


const CardPage = ({open,setOpen,card,relode,setRelode,loading}) => {
  const apikey = import.meta.env.VITE_API_KEY;
  const apiToken = import.meta.env.VITE_API_TOKEN;
  const [relodeData,setRelodeData]=useState(true)
  
  async function addCheckList(name){
    if(!name)return;
    await axios.post(`https://api.trello.com/1/checklists?idCard=${card.id}&key=${apikey}&token=${apiToken}&name=${name}`)
    setRelode((prev)=>!prev)
}
async function delCheckList(checklistId){
  const delUrl=`https://api.trello.com/1/checklists/${checklistId}?key=${apikey}&token=${apiToken}`
  await axios.delete(delUrl)
  setRelode(prev=>!prev);

}
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} trapFocus={false} closeOnOverlayClick={false} size='lg'>
      <DialogContent bg='#323940' color='#8d98a3'>
        <DialogHeader>
          <DialogTitle>{card.name}</DialogTitle>
        </DialogHeader>
        <DialogBody>
        <Grid templateColumns={'repeat(6,1fr)'} gap={2}>
        <GridItem colSpan={5}>
          {loading?'loading':card.idChecklists.map((currId,i)=>{
            return <SingleChecklist key={currId} id={currId} relode={relode} setRelode={setRelode} delCheckList={delCheckList} relodeData={relodeData} setRelodeData={setRelodeData} cardId={card.id}/>
          })}
         
    </GridItem>
    <GridItem >
       <PopupForm addBoard={addCheckList} title={'Create CheckList'}/>
    </GridItem>
    </Grid>

        </DialogBody>
        <DialogCloseTrigger  color='white'/>
      </DialogContent>
    </DialogRoot>
  )
}
export default CardPage