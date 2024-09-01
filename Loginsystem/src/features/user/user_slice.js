import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "",
  login: !!localStorage.getItem("session_key") ? true : false,
  fullname: localStorage.getItem("fullname") || "",
  read_only: JSON.parse(localStorage.read_only??0),
};

export const getLogin = createAsyncThunk("user/login", (body) => {
  let req = { type: "login", data: body }; 
  return socket.post(req);
});

export const getLogout = createAsyncThunk("user/logout", () => { 
  let req = { type: "logout", data: {} }; 
  return socket.post(req);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (
          state.loading != "idle"
      ) {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLogin.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.login = action.payload.tag == "success";
    });

    builder.addCase(getLogin.rejected, (state, action) => {
      state.loading = action.error.name;
      state.login = false;
      state.msg = action.error.message;
    });

    builder.addCase(getLogout.pending, (state, action) => {
      state.loading = "pending";
    });

    builder.addCase(getLogout.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.login = false;
      state.msg = action.payload.data.msg;
    });

    builder.addCase(getLogout.rejected, (state, action) => {
      state.loading = action.error.name;
      state.login = true;
      state.msg = action.error.message;
    });
  },
});

export const { initLoader } = userSlice.actions;
export default userSlice.reducer;
