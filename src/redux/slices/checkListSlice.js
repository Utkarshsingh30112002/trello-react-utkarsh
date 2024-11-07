import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchCheckList=createAsyncThunk('checkListSlice/fetchCheckList',async({id,url},{rejectWithValue})=>{
    try{
        const response=await axios.get(url);
        return response.data;
    } catch(err){
        return rejectWithValue(
            err.response?.data||'Error While Fetching A Card'
        )
    }
})

const checkListSlice=createSlice({
    name:'checkList',
    initialState:{
        data:{},
        error:null,
        loading:{}
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchCheckList.pending,(state,action)=>{
            const { id } = action.meta.arg;
            state.loading[id]=true;
            state.error=null;
        })
        .addCase(fetchCheckList.fulfilled,(state,action)=>{
            const { id } = action.meta.arg;
            state.loading[id]=false;
            state.data[id]=action.payload;
        })
        .addCase(fetchCheckList.rejected,(state,action)=>{
            const { id } = action.meta.arg;
            state.loading[id]=false;
            state.error=action.payload;
        })
    }

}
)
export {fetchCheckList }
export default checkListSlice.reducer