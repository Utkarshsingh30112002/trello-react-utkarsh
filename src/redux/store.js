import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './slices/boardsSlice'

export default configureStore({
  reducer: {
    boards:boardsReducer
  }
})