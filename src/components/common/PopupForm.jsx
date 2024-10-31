import { Input, Stack, Text } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

const PopupForm = ({addBoard,title}) => {
    const [value,setValue]=useState('')
    

    function handleSubmit(e){
      e.preventDefault()
      addBoard(value.trim())

      setValue(''); // Clear the input after submission
    }
  return (
    <PopoverRoot colorPalette='gray'>
      <PopoverTrigger asChild>
        <Button size="sm" h='100%'>
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent bg='#282e33' color='white'>
        <PopoverArrow />
        <PopoverBody>
        <form onSubmit={handleSubmit}>
        <Stack gap="4">
          <label>
            <Text>Name</Text>
            <Input
              value={value}
              onChange={(e)=>setValue(e.target.value)}
              placeholder="Enter The Name for Board"
              bg='#282e33'
              color='whiteAlpha.900'
              border={'solid 0.8px'}
            />
          </label>
          <Button size="sm"  type="submit" bg='#0067A3'>
            Submit
          </Button>
        </Stack>
        
      </form>
      
        </PopoverBody><PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  )
}

export default PopupForm