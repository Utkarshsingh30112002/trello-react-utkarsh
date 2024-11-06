import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Error While Fetching Boards"
      );
    }
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    data: [],
    loading: true,
    error: null,
    searchInput: "",
    sortBy: "A-Z",
  },
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectSearchAndSortBy = createSelector(
  [
    (state) => state.boards.data,
    (state) => state.boards.sortBy,
    (state) => state.boards.searchInput,
  ],
  (data, sortBy, searchInput) => {
    return data
      .filter((curr) =>
        curr.name.toLowerCase().includes(searchInput.toLowerCase())
      )
      .sort((a, b) => {
        let aName = a.name.toLowerCase();
        let bName = b.name.toLowerCase();
        if (aName < bName) return sortBy == "Z-A" ? 1 : -1;
        if (bName < aName) return sortBy == "A-Z" ? -1 : 1;
        else return 0;
      });
  }
);

export const selectRecent = createSelector(
  [(state) => state.boards.data],
  (data) => {
    return data
      .filter((board) => !board.closed)
      .sort((a, b) => new Date(b.dateLastView) - new Date(a.dateLastView))
      .slice(0, 5);
  }
);

export const { setSearchInput, setSortBy } = boardsSlice.actions;

export default boardsSlice.reducer;
