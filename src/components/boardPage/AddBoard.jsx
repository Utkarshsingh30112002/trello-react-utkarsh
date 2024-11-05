import { Card } from "@chakra-ui/react"
import PopupForm from "../common/PopupForm";


const AddBoard = ({addBoard}) => {
  return (
    <Card.Root w="300px" h="100px" bg="#0067A3">
        <PopupForm addBoard={addBoard} title={"Add Board"} />
      </Card.Root>
  )
}

export default AddBoard