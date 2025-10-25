import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://urbangraphtees-be.onrender.com/wishlist";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
};

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/${userId}`, getAuthConfig());
      return data?.products || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId,  products }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/add`,
        { userId,  products },
        getAuthConfig()
      );
      return data?.products || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  }
);


export const removeFromWishlistServer = createAsyncThunk(
  "wishlist/removeFromWishlistServer",
  async ({ userId, products }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/remove`,
        { userId, products },
        getAuthConfig()
      );
      return data?.products || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist"
      );
    }
  }
);

export const clearWishlistServer = createAsyncThunk(
  "wishlist/clearWishlistServer",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/clear`,
        { data: { userId }, ...getAuthConfig() }
      );
      return data?.products || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear wishlist"
      );
    }
  }
);


const initialState = {
  items: JSON.parse(localStorage.getItem("wishlistItems")) || [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlistLocal: (state, action) => {
      const exists = state.items.find((x) => x._id === action.payload._id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("wishlistItems", JSON.stringify(state.items));
      }
    },

    removeWishlistLocal: (state, action) => {
      state.items = state.items.filter((x) => x._id !== action.payload);
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },

    clearWishlistLocal: (state) => {
      state.items = [];
      localStorage.removeItem("wishlistItems");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        localStorage.setItem("wishlistItems", JSON.stringify(state.items));
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem("wishlistItems", JSON.stringify(state.items));
      })

      .addCase(removeFromWishlistServer.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem("wishlistItems", JSON.stringify(state.items));
      })

      .addCase(clearWishlistServer.fulfilled, (state) => {
        state.items = [];
        localStorage.removeItem("wishlistItems");
      });
  },
});

export const {
  addWishlistLocal,
  removeWishlistLocal,
  clearWishlistLocal,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;