
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "https://urbangraphtees-be.onrender.com/cart";

// const getAuthConfig = () => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//       "Content-Type": "application/json",
//     },
//   };
// };

// const calculateTotals = (cartItems) => {
//   const { totalItems, totalAmount } = cartItems.reduce(
//     (acc, item) => {
//       const quantity = item.quantity || 1;
//       const price =
//         item.price || item.productId?.price || 0;
//       acc.totalItems += quantity;
//       acc.totalAmount += quantity * price;
//       return acc;
//     },
//     { totalItems: 0, totalAmount: 0 }
//   );
//   return { totalItems, totalAmount };
// };


// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(`${API_URL}`, getAuthConfig());
//       return data.items || data || [];
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch cart"
//       );
//     }
//   }
// );

// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async (item, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(`${API_URL}/add`, item, getAuthConfig());
//       return data.items || data || [];
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to add item"
//       );
//     }
//   }
// );

// export const updateCartItem = createAsyncThunk(
//   "cart/updateCartItem",
//   async (item, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.put(`${API_URL}/update`, item, getAuthConfig());
//       return data.items || data || [];
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to update item"
//       );
//     }
//   }
// );

// export const removeCartItem = createAsyncThunk(
//   "cart/removeCartItem",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.delete(
//         `${API_URL}/remove/${productId}`,
//         getAuthConfig()
//       );
//       return data.items || data || [];
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to remove item"
//       );
//     }
//   }
// );

// export const clearCartServer = createAsyncThunk(
//   "cart/clearCartServer",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.delete(`${API_URL}/clear`, getAuthConfig());
//       return data.items || data || [];
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to clear cart"
//       );
//     }
//   }
// );

// const initialState = {
//   cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
//   totalItems: 0,
//   totalAmount: 0,
//   loading: false,
//   error: null,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItemLocal: (state, action) => {
//       const item = action.payload;
//       const existItem = state.cartItems.find((x) => x._id === item._id);

//       if (existItem) {
//         state.cartItems = state.cartItems.map((x) =>
//           x._id === item._id ? { ...x, quantity: x.quantity + 1 } : x
//         );
//       } else {
//         state.cartItems.push({ ...item, quantity: 1 });
//       }

//       const { totalItems, totalAmount } = calculateTotals(state.cartItems);
//       state.totalItems = totalItems;
//       state.totalAmount = totalAmount;

//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//     },

//     removeItemLocal: (state, action) => {
//       state.cartItems = state.cartItems.filter(
//         (x) => x._id !== action.payload
//       );
//       const { totalItems, totalAmount } = calculateTotals(state.cartItems);
//       state.totalItems = totalItems;
//       state.totalAmount = totalAmount;
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//     },

//     clearCartLocal: (state) => {
//       state.cartItems = [];
//       state.totalItems = 0;
//       state.totalAmount = 0;
//       localStorage.removeItem("cartItems");
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cartItems = action.payload;
//         const { totalItems, totalAmount } = calculateTotals(state.cartItems);
//         state.totalItems = totalItems;
//         state.totalAmount = totalAmount;
//         localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.cartItems = action.payload;
//         const { totalItems, totalAmount } = calculateTotals(state.cartItems);
//         state.totalItems = totalItems;
//         state.totalAmount = totalAmount;
//         localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       })

//       .addCase(updateCartItem.fulfilled, (state, action) => {
//         state.cartItems = action.payload;
//         const { totalItems, totalAmount } = calculateTotals(state.cartItems);
//         state.totalItems = totalItems;
//         state.totalAmount = totalAmount;
//         localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       })

//       .addCase(removeCartItem.fulfilled, (state, action) => {
//         state.cartItems = action.payload;
//         const { totalItems, totalAmount } = calculateTotals(state.cartItems);
//         state.totalItems = totalItems;
//         state.totalAmount = totalAmount;
//         localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       })

//       .addCase(clearCartServer.fulfilled, (state) => {
//         state.cartItems = [];
//         state.totalItems = 0;
//         state.totalAmount = 0;
//         localStorage.removeItem("cartItems");
//       });
//   },
// });

// export const { addItemLocal, removeItemLocal, clearCartLocal } =
//   cartSlice.actions;

// export default cartSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://urbangraphtees-be.onrender.com/cart";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
};

const calculateTotals = (cartItems) => {
  const { totalItems, totalAmount } = cartItems.reduce(
    (acc, item) => {
      const quantity = item.quantity || 1;
      const price = item.price || item.productId?.price || 0;
      acc.totalItems += quantity;
      acc.totalAmount += quantity * price;
      return acc;
    },
    { totalItems: 0, totalAmount: 0 }
  );
  return { totalItems, totalAmount };
};


export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}`, getAuthConfig());
      return data.items || data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/add`, item, getAuthConfig());
      return data.items || data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (item, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/update`, item, getAuthConfig());
      return data.items || data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update item"
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/remove/${productId}`,
        getAuthConfig()
      );
      return data.items || data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/increase/${productId}`, {}, getAuthConfig());
      return data.items || data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to increase quantity"
      );
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/decrease/${productId}`, {}, getAuthConfig());
      return data.items || data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to decrease quantity"
      );
    }
  }
);

export const clearCartServer = createAsyncThunk(
  "cart/clearCartServer",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${API_URL}/clear`, getAuthConfig());
      return data.items || data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalItems: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemLocal: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x._id === item._id || x.productId === item.productId
      );

      if (existItem) {
        existItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      const { totalItems, totalAmount } = calculateTotals(state.cartItems);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeItemLocal: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== action.payload && x.productId !== action.payload
      );
      const { totalItems, totalAmount } = calculateTotals(state.cartItems);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQuantityLocal: (state, action) => {
      const item = state.cartItems.find(
        (x) => x._id === action.payload || x.productId === action.payload
      );
      if (item) item.quantity += 1;
      const { totalItems, totalAmount } = calculateTotals(state.cartItems);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseQuantityLocal: (state, action) => {
      const item = state.cartItems.find(
        (x) => x._id === action.payload || x.productId === action.payload
      );
      if (item && item.quantity > 1) item.quantity -= 1;
      const { totalItems, totalAmount } = calculateTotals(state.cartItems);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCartLocal: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalAmount = 0;
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
        const { totalItems, totalAmount } = calculateTotals(state.cartItems);
        state.totalItems = totalItems;
        state.totalAmount = totalAmount;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        const { totalItems, totalAmount } = calculateTotals(state.cartItems);
        state.totalItems = totalItems;
        state.totalAmount = totalAmount;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        const { totalItems, totalAmount } = calculateTotals(state.cartItems);
        state.totalItems = totalItems;
        state.totalAmount = totalAmount;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        const { totalItems, totalAmount } = calculateTotals(state.cartItems);
        state.totalItems = totalItems;
        state.totalAmount = totalAmount;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })

      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        const { totalItems, totalAmount } = calculateTotals(state.cartItems);
        state.totalItems = totalItems;
        state.totalAmount = totalAmount;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })

      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        const { totalItems, totalAmount } = calculateTotals(state.cartItems);
        state.totalItems = totalItems;
        state.totalAmount = totalAmount;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })

      .addCase(clearCartServer.fulfilled, (state) => {
        state.cartItems = [];
        state.totalItems = 0;
        state.totalAmount = 0;
        localStorage.removeItem("cartItems");
      });
  },
});

export const {
  addItemLocal,
  removeItemLocal,
  increaseQuantityLocal,
  decreaseQuantityLocal,
  clearCartLocal,
} = cartSlice.actions;

export default cartSlice.reducer;