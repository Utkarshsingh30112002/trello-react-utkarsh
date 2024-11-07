import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchAllCards=createAsyncThunk('allCardsSlice/fetchAllCards',async({listId,url},{rejectWithValue})=>{
    try{
        const response=await axios.get(url);
        return response.data;
    } catch(err){
        return rejectWithValue(
            err.response?.data||'Error While Fetching Cards'
        )
    }
})

const allCardsSlice=createSlice({
    name:'allCards',
    initialState:{
        data:{},
        error:null,
        loading:{}
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllCards.pending,(state,action)=>{
            const { listId } = action.meta.arg;
            state.loading[listId]=true;
            state.error=null;
        })
        .addCase(fetchAllCards.fulfilled,(state,action)=>{
            const { listId } = action.meta.arg;
            state.loading[listId]=false;
            state.data[listId]=action.payload;
        })
        .addCase(fetchAllCards.rejected,(state,action)=>{
            state.loading[listId]=false;
            state.error=action.payload;
        })
    }

}
)
export {fetchAllCards }
export default allCardsSlice.reducer