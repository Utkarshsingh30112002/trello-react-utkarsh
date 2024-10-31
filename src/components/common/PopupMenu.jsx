
import { Button } from "@/components/ui/button"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { VStack } from "@chakra-ui/react"
import { IoMdMenu } from "react-icons/io";

const PopupMenu = ({deleteFn,id}) => {
  const [open, setOpen] = useState(false)
  

  return (
    <PopoverRoot open={open} onOpenChange={(e) => setOpen(e.open)} >
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          < IoMdMenu color="white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent bgColor='#172b4d' color='white'>
        <PopoverArrow />
        <PopoverBody>
         <VStack>
         <Button size="sm" variant="outline" onClick={()=>deleteFn(id)} color='white'px='40px'>
          Archive/Delete
        </Button>
         </VStack>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}

export default PopupMenu;
