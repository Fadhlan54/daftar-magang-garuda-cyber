import toolkit from "@reduxjs/toolkit";

const { configureStore, createSlice } = toolkit;

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

store.subscribe(() => {
  console.log("Store change : ", store.getState());
});

store.dispatch(cartSlice.actions.addToCart({ id: 1, quantity: 20 }));
store.dispatch(cartSlice.actions.addToCart({ id: 2, quantity: 25 }));
