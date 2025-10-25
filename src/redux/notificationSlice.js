
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://urbangraphtees-be.onrender.com/notification";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch notifications");
    }
  }
);


export const createNotification = createAsyncThunk(
  "notifications/createNotification",
  async (notificationData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(API_URL, notificationData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create notification");
    }
  }
);

export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_URL}/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to mark as read");
    }
  }
);

export const markAsUnread = createAsyncThunk(
  "notifications/markAsUnread",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_URL}/${id}/unread`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to mark as unread");
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/read-all`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to mark all as read");
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete notification");
    }
  }
);

export const clearAllNotifications = createAsyncThunk(
  "notifications/clearAllNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/clear-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to clear notifications");
    }
  }
);

const loadLocalNotifications = () => {
  try {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveLocalNotifications = (notifications) => {
  localStorage.setItem("notifications", JSON.stringify(notifications));
};

const computedUnreadCount = (items = []) => items.reduce((acc, n) => acc + (n.isRead ? 0 : 1), 0);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: loadLocalNotifications(),
    unreadCount: computedUnreadCount(loadLocalNotifications()),
    loading: false,
    error: null,
  },
  reducers: {
    addNotificationLocal: (state, action) => {
      state.items.unshift({
        ...action.payload,
        _id: Date.now().toString(),
        isRead: false,
        createdAt: new Date().toLocaleString(),
      });
      state.unreadCount = computedUnreadCount(state.items)
      saveLocalNotifications(state.items);
    },
    markAsReadLocal: (state, action) => {
      const item = state.items.find((n) => n._id === action.payload);
      if (item) item.isRead = true;
      state.unreadCount = computedUnreadCount(state.items)
      saveLocalNotifications(state.items);
    },
    markAsUnreadLocal: (state, action) => {
      const item = state.items.find((n) => n._id === action.payload);
      if (item) item.isRead = false;
      state.unreadCount = computedUnreadCount(state.items)
      saveLocalNotifications(state.items);
    },
    deleteNotificationLocal: (state, action) => {
      state.items = state.items.filter((n) => n._id !== action.payload);
      state.unreadCount = computedUnreadCount(state.items)
      saveLocalNotifications(state.items);
    },
    markAllAsReadLocal: (state) => {
      state.items = state.items.map((n) => ({ ...n, isRead: true }));
      state.unreadCount = 0
      saveLocalNotifications(state.items);
    },
    clearNotificationsLocal: (state) => {
      state.items = [];
      state.unreadCount = 0
      saveLocalNotifications([]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.unreadCount = computedUnreadCount(state.items)
        saveLocalNotifications(state.items);
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createNotification.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        saveLocalNotifications(state.items);
      })

      .addCase(markAsRead.fulfilled, (state, action) => {
        const item = state.items.find((n) => n._id === action.payload._id);
        if (item) item.isRead = true;
        saveLocalNotifications(state.items);
      })

      .addCase(markAsUnread.fulfilled, (state, action) => {
        const item = state.items.find((n) => n._id === action.payload._id);
        if (item) item.isRead = false;
        saveLocalNotifications(state.items);
      })

      .addCase(markAllAsRead.fulfilled, (state) => {
        state.items = state.items.map((n) => ({ ...n, isRead: true }));
        saveLocalNotifications(state.items);
      })

      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.items = state.items.filter((n) => n._id !== action.payload);
        saveLocalNotifications(state.items);
      })

      .addCase(clearAllNotifications.fulfilled, (state) => {
        state.items = [];
        saveLocalNotifications([]);
      });
  },
});

export const {
  addNotificationLocal,
  markAsReadLocal,
  markAsUnreadLocal,
  deleteNotificationLocal,
  markAllAsReadLocal,
  clearNotificationsLocal,
} = notificationSlice.actions;

export const selectUnreadCount = (state) => state.notification.unreadCount;

export default notificationSlice.reducer;