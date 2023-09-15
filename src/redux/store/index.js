import myReducer from "../reducers";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: myReducer,
});
export default store;
