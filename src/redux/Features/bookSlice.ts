import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    book: 0,
}

const bookSlice = createSlice({
    name: "bookList",
    initialState,
    reducers: {},

})

export default bookSlice.reducer;