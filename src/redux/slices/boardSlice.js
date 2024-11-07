import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchSingleBoard=createAsyncThunk('boardSlice/fetchSingleBoard',async(url,{rejectWithValue})=>{
    try{
        const response=await axios.get(url);
        return response.data;
    } catch(err){
        return rejectWithValue(
            err.response?.data||'Error While Fetching SingleBoard'
        )
    }
})

const boardSlice=createSlice({
    name:'singleBoard',
    initialState:{
        data:[],
        error:null,
        loading:true
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchSingleBoard.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchSingleBoard.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        })
        .addCase(fetchSingleBoard.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }

}
)
export {fetchSingleBoard }
export default boardSlice.reducer