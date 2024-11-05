import { Card, Editable, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { LuCheck, LuPencilLine, LuX } from 'react-icons/lu'

const EditableCard = ({value,addList,setValue}) => {
  return (
    <Card.Root w="300px" bgColor="black" color="white" alignSelf="start">
          <Editable.Root
            value={value}
            onValueCommit={addList}
            onValueChange={(e) => setValue(e.value)}
            submitMode="enter"
          >
            <Editable.Preview />
            <Editable.Input h="100px" m="1" />
            <Editable.Control>
              <Editable.EditTrigger asChild>
                <IconButton variant="ghost" size="xs" color='white' _hover={{bg:'whiteAlpha.400'}}>
                  <Text fontSize='lg'>Create List</Text> <LuPencilLine color="white" />
                </IconButton>
              </Editable.EditTrigger>
              <Editable.CancelTrigger asChild>
                <IconButton variant="outline" size="xs" color="white">
                  <LuX color="white" />
                </IconButton>
              </Editable.CancelTrigger>
              <Editable.SubmitTrigger asChild>
                <IconButton variant="outline" size="xs" color="white">
                  <LuCheck color="white" />
                </IconButton>
              </Editable.SubmitTrigger>
            </Editable.Control>
          </Editable.Root>
        </Card.Root>
  )
}

export default EditableCard