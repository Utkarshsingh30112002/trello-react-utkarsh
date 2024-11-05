import { HStack,Input} from "@chakra-ui/react";
import {NativeSelectField,NativeSelectRoot} from "@/components/ui/native-select"

const SearchAndSort = ({sortBy,setSortBy,search,setSearch}) => {
  return (
    <HStack mb="10px" gap="10px" mx='5'>
        <NativeSelectRoot
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          width="150px"
          color='whiteAlpha.700'
        >
          <NativeSelectField>
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
          </NativeSelectField>
        </NativeSelectRoot>

        
        <Input
          w='200px'
          placeholder="Search boards"
          color='whiteAlpha.700'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </HStack>
  )
}

export default SearchAndSort