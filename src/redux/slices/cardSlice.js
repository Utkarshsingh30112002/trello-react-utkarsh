import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchACard=createAsyncThunk('cardSlice/fetchACard',async({cardId,url},{rejectWithValue})=>{
    try{
        const response=await axios.get(url);
        return response.data;
    } catch(err){
        return rejectWithValue(
            err.response?.data||'Error While Fetching A Card'
        )
    }
})

const cardSlice=createSlice({
    name:'card',
    initialState:{
        data:{},
        error:null,
        loading:{}
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchACard.pending,(state,action)=>{
            const { cardId } = action.meta.arg;
            state.loading[cardId]=true;
            state.error=null;
        })
        .addCase(fetchACard.fulfilled,(state,action)=>{
            const { cardId } = action.meta.arg;
            state.loading[cardId]=false;
            state.data[cardId]=action.payload;
        })
        .addCase(fetchACard.rejected,(state,action)=>{
            const { cardId } = action.meta.arg;
            state.loading[cardId]=false;
            state.error=action.payload;
        })
    }

}
)
export {fetchACard }
export default cardSlice.reducer