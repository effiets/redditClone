import { combineReducers, configureStore } from "@reduxjs/toolkit";
import redditReducer from './redditSlice'
import subRedditReducer from './subRedditSlice'


const store = configureStore({
    reducer: combineReducers({
        reddit: redditReducer,
        subReddit: subRedditReducer
    })
})

export default store;
