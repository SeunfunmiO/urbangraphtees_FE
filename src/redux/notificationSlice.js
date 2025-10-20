// import { createSlice } from "@reduxjs/toolkit";

// const loadNotificationsFromStorage = () => {
//     try {
//         const savedNotification = localStorage.getItem('notifications')
//         return savedNotification ? JSON.parse(savedNotification) : [];
//     } catch (error) {
//         console.log(' Error loading notifications from localstorage', error);
//         return []
//     }
// };

// export const notificationSlice = createSlice({
//     name: 'notification',
//     initialState: {
//         notifications: loadNotificationsFromStorage(),
//         unreadCount: loadNotificationsFromStorage().filter(n => !n.read).length,
//     },
//     reducers: {
//         addNotification: (state, action) => {
//             const newNotification = {
//                 id: Date.now(),
//                 message: action.payload.message,
//                 type: action.payload.type || "info",
//                 read: false,
//                 timestamp: new Date().toLocaleString(),
//             };
//             state.notifications.unshift(newNotification);
//             state.unreadCount += 1;
//             localStorage.setItem('notifications', JSON.stringify(state.notifications))
//         },

//         markAsRead: (state, action) => {
//             const notif = state.notifications.find(
//                 (n) => n.id === action.payload
//             );
//             if (notif && !notif.read) {
//                 notif.read = true;
//                 state.unreadCount -= 1;
//             }
//             localStorage.setItem('notifications', JSON.stringify(state.notifications))
//         },
//         markAsUnread: (state, action) => {
//             const notif = state.notifications.find(
//                 (n) => n.id === action.payload
//             );
//             if (notif && notif.read) {
//                 notif.read = false
//                 state.unreadCount += 1;
//             }
//             localStorage.setItem('notifications', JSON.stringify(state.notifications))
//         },
//         markAllAsRead: (state) => {
//             state.notifications.forEach((n) => (n.read = true));
//             state.unreadCount = 0;
//             localStorage.setItem('notifications', JSON.stringify(state.notifications))
//         },
//         removeNotification: (state, action) => {
//             state.notifications = state.notifications.filter(
//                 (n) => n.id !== action.payload
//             );
//             localStorage.setItem('notifications', JSON.stringify(state.notifications))
//         },
//         clearAllNotifications: (state) => {
//             state.notifications = [];
//             state.unreadCount = 0;
//             localStorage.setItem('notifications', JSON.stringify([]))
//         },
//     }
// })

// export const {
//     addNotification,
//     markAsRead,
//     markAsUnread,
//     markAllAsRead,
//     removeNotification,
//     clearAllNotifications,
// } = notificationSlice.actions;

// export default notificationSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://urbangraphtees-be.onrender.com/notification";

const saveToLocal = (notifications) => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    const unreadCount = notifications.filter((n) => !n.read).length;
    localStorage.setItem("unreadCount", unreadCount);
};

const loadFromLocal = () => {
    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    const unreadCount = Number(localStorage.getItem("unreadCount")) || 0;
    return { notifications, unreadCount };
};

const { notifications: cachedNotifications, unreadCount: cachedUnread } = loadFromLocal();


export const fetchNotifications = createAsyncThunk(
    "notifications/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}`, { withCredentials: true });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);


export const addNotification = createAsyncThunk(
    "notifications/add",
    async (notificationData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}`, notificationData, { withCredentials: true });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);


export const markAsRead = createAsyncThunk(
    "notifications/markAsRead",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${API_URL}/${id}/read`, {}, { withCredentials: true });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const markAsUnread = createAsyncThunk(
    "notifications/markAsUnread",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${API_URL}/${id}/unread`, {}, { withCredentials: true });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const markAllAsRead = createAsyncThunk(
    "notifications/markAllAsRead",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${API_URL}/read-all`, {}, { withCredentials: true });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);


export const removeNotification = createAsyncThunk(
    "notifications/remove",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
            return res
            //   return { id };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);


export const clearAllNotifications = createAsyncThunk(
    "notifications/clearAll",
    async (_, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/clear`, { withCredentials: true });
            return [];
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        notifications: cachedNotifications,
        unreadCount: cachedUnread,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
                state.unreadCount = action.payload.filter((n) => !n.read).length;
                saveToLocal(state.notifications);
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(addNotification.fulfilled, (state, action) => {
                state.notifications.unshift(action.payload);
                state.unreadCount++;
                saveToLocal(state.notifications);
            })


            .addCase(markAsRead.fulfilled, (state, action) => {
                const index = state.notifications.findIndex((n) => n._id === action.payload._id);
                if (index !== -1) {
                    state.notifications[index].read = true;
                    state.unreadCount = state.notifications.filter((n) => !n.read).length;
                }
                saveToLocal(state.notifications);
            })

            .addCase(markAsUnread.fulfilled, (state, action) => {
                const updated = action.payload.notification || action.payload
                const index = state.notifications.findIndex((n) => n._id === updated._id);
                if (index !== -1) {
                    state.notifications[index].read = false;
                    state.unreadCount = state.notifications.filter((n) => !n.read).length;
                }
                saveToLocal(state.notifications);
            })

            .addCase(markAllAsRead.fulfilled, (state) => {
                state.notifications.forEach((n) => (n.read = true));
                state.unreadCount = 0;
                saveToLocal(state.notifications);
            })

            .addCase(removeNotification.fulfilled, (state, action) => {
                state.notifications = state.notifications.filter((n) => n._id !== action.payload.id);
                state.unreadCount = state.notifications.filter((n) => !n.read).length;
                saveToLocal(state.notifications);
            })

            .addCase(clearAllNotifications.fulfilled, (state) => {
                state.notifications = [];
                state.unreadCount = 0;
                saveToLocal([]);
            });
    },
});

export default notificationSlice.reducer;



