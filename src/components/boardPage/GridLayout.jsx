import { SimpleGrid, Spinner } from '@chakra-ui/react'
import React from 'react'
import AddBoard from './AddBoard'
import Board from './Board'

const GridLayout = ({loading,addBoard,data,Notrecent}) => {
  return (
    <SimpleGrid
        minChildWidth="300px"
        gap="10px"
        m="5px"
        placeItems="center"
        pb="10"
      >
        {loading ? (
          <Spinner size="xl" />
        ) : (
          data.map((curr) => <Board key={curr.id} curr={curr} />)
        )}
        {Notrecent&&<AddBoard addBoard={addBoard} />}
      </SimpleGrid>
  )
}

export default GridLayout