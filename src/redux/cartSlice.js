
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "https://urbangraphtees-be.onrender.com/cart"; // change to your backend URL

// export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
//   try {
//     const res = await axios.get(`${API_URL}`);
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || err.message);
//   }
// });

// export const addToCart = createAsyncThunk("cart/addToCart", async (data, { rejectWithValue }) => {
//   try {
//     const res = await axios.post(`${API_URL}/add`, data);
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || err.message);
//   }
// });


// export const updateCartItem = createAsyncThunk("cart/updateItem", async (data, { rejectWithValue }) => {
//   try {
//     const res = await axios.patch(`${API_URL}/update`, data);
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || err.message);
//   }
// });


// export const removeCartItem = createAsyncThunk("cart/removeItem", async (productId, { rejectWithValue }) => {
//   try {
//     const res = await axios.delete(`${API_URL}/remove/${productId}`);
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || err.message);
//   }
// });

// export const clearCart = createAsyncThunk("cart/clear", async (_, { rejectWithValue }) => {
//   try {
//     const res = await axios.delete(`${API_URL}/clear`);
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || err.message);
//   }
// });

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//     totalItems: 0,
//     totalAmount: 0,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload.items || [];
//         state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
//         state.totalAmount = state.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//         state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
//         state.totalAmount = state.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
//       })

//       .addCase(updateCartItem.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//         state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
//         state.totalAmount = state.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
//       })

//       .addCase(removeCartItem.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//         state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
//         state.totalAmount = state.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
//       })

//       .addCase(clearCart.fulfilled, (state) => {
//         state.items = [];
//         state.totalItems = 0;
//         state.totalAmount = 0;
//       });
//   },
// });

// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://urbangraphtees-be.onrender.com/cart";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};


export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_URL}/, getAuthConfig()`);
    return data.cart || [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (item, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API_URL}/add`, item, getAuthConfig());
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to add item");
  }
});


export const updateCartItem = createAsyncThunk("cart/updateCartItem", async (item, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_URL}/update`, item, getAuthConfig());
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update item");
  }
});

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (productId, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`${API_URL}/remove/${productId}`, productId, getAuthConfig());
    return data.cart;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to remove item");
  }
});


export const clearCartServer = createAsyncThunk("cart/clearCartServer", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`${API_URL}/clear`, getAuthConfig());
    return data.cart || [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to clear cart");
  }
});

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemLocal: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItemLocal: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCartLocal: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
      })
      // .addCase(removeCartItem.fulfilled, (state, action) => {
      //   state.cartItems = action.payload;
      //   state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
      //   state.totalAmount = state.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
      // })
      .addCase(clearCartServer.fulfilled, (state) => {
        state.cartItems = [];
        localStorage.removeItem("cartItems");
      });
  },
});

export const { addItemLocal, removeItemLocal, clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;