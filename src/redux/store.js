import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './slices/boardsSlice'
import singleBoardReducer from './slices/boardSlice'
import allCardsReducer from './slices/allCardsSlice'
import cardReducer from './slices/cardSlice'
import checkListReducer from './slices/checkListSlice'


export default configureStore({
  reducer: {
    boards:boardsReducer,
    singleBoard:singleBoardReducer,
    allCards:allCardsReducer,
    card:cardReducer,
    checkList:checkListReducer
  }
})