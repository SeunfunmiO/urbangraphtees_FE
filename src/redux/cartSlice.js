// import { createSlice } from "@reduxjs/toolkit";

// const loadCartFromStorage = () => {
//     try {
//         const savedCart = localStorage.getItem('cart');
//         return savedCart ? JSON.parse(savedCart) : [];
//     } catch (error) {
//         console.error('Error loading cart from localStorage:', error);
//         return [];
//     }
// };
// export const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         items: loadCartFromStorage(),
//     },
//     reducers: {
//         addToCart: (state, action) => {
//             const product = action.payload;
//             const existingItem = state.items.find((item) =>
//                 item.id === product.id && item.size === product.size && item.color === product.color);
//             if (existingItem) {
//                 existingItem.quantity += 1;
//             } else {
//                 state.items.push({ ...product, quantity: 1 });
//             }
//             localStorage.setItem('cart', JSON.stringify(state.items));
//         },
//         removeFromCart: (state, action) => {
//             state.items = state.items.filter((item) => item.id !== action.payload);
//             localStorage.setItem('cart', JSON.stringify(state.items));
//         },
//         decreaseQuantity: (state, action) => {
//             const item = state.items.find((i) => i.id === action.payload);
//             if (item && item.quantity > 1) {
//                 item.quantity -= 1;
//             } else {
//                 state.items = state.items.filter((i) => i.id !== action.payload);
//             }
//             localStorage.setItem('cart', JSON.stringify(state.items));
//         },
//         clearCart: (state) => {
//             state.items = [];
//             localStorage.setItem('cart', JSON.stringify(state.items));
//         },
//     }
// })
// export const { addToCart, removeFromCart, decreaseQuantity, clearCart, items } = cartSlice.actions
// export default cartSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://urbangraphtees-be.onrender.com/cart"; // change to your backend URL

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/add`, data, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});


export const updateCartItem = createAsyncThunk("cart/updateItem", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.patch(`${API_URL}/update`, data, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});


export const removeCartItem = createAsyncThunk("cart/removeItem", async (productId, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${API_URL}/remove/${productId}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const clearCart = createAsyncThunk("cart/clear", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${API_URL}/clear`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
        state.totalAmount = state.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
        state.totalAmount = state.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
        state.totalAmount = state.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
        state.totalAmount = state.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
      })

      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
        state.totalAmount = 0;
      });
  },
});

export default cartSlice.reducer;