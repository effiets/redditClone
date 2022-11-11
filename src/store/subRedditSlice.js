import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubReddits = createAsyncThunk(
  "subReddits/fetchSubReddits",
  async () => {
    const response = await fetch("https://www.reddit.com/subreddits.json");
    const json = await response.json();
    return json.data.children.map((subreddit) => subreddit.data);
  }
);

const initialState = {
  subReddits: [],
  isLoading: false,
  hasError: false,
  isVissible: false,
};

const subRedditSlice = createSlice({
  name: "subReddit",
  initialState,
  reducers: {
   
  },
  extraReducers: {
    [fetchSubReddits.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchSubReddits.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [fetchSubReddits.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.subReddits = action.payload;
    },
  },
});

export default subRedditSlice.reducer;
