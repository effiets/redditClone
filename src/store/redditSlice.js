import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchReddits = createAsyncThunk(
  "reddits/fetchReddits",
  async (subreddit) => {
    const response = await fetch(`https://www.reddit.com/${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
  }
);

export const fetchSearchReddits = createAsyncThunk(
  "reddit/fetchSearchReddits",
  async (searchTerm) => {
    const response = await fetch(
      `https://www.reddit.com/search.json?q=${searchTerm}`
    );
    const json = await response.json();
    return json.data.children.map((post) => post.data);
  }
);




const initialState = {
  reddits: [],
  isLoadding: false,
  hasError: false,
  searchTerm: "",
  selectedSubReddit: "r/worldnews",
};

const redditSlice = createSlice({
  name: "reddit",
  initialState,
  reducers: {
    setReddits: (state, action) => {
      state.reddits = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSubReddit: (state, action) => {
      state.selectedSubReddit = action.payload;
    },
  
  },
  extraReducers: {
    [fetchReddits.pending]: (state) => {
      state.isLoadding = true;
      state.hasError = false;
    },
    [fetchReddits.rejected]: (state) => {
      state.isLoadding = false;
      state.hasError = true;
    },
    [fetchReddits.fulfilled]: (state, action) => {
      state.isLoadding = false;
      state.hasError = false;
      state.reddits = action.payload;
    },
    [fetchSearchReddits.pending]: (state) => {
      state.isLoadding = true;
      state.hasError = false;
    },
    [fetchSearchReddits.rejected]: (state) => {
      state.isLoadding = false;
      state.hasError = true;
    },
    [fetchSearchReddits.fulfilled]: (state, action) => {
      state.isLoadding = false;
      state.hasError = false;
      state.reddits = action.payload;
      state.searchTerm = "";
      state.selectedSubReddit = "";
    },
  },
});

export const {setReddits, setSearchTerm, setSelectedSubReddit, toggleComments} = redditSlice.actions;

export default redditSlice.reducer;
