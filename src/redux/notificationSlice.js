import { createSlice } from "@reduxjs/toolkit";

const loadNotificationFromStorage = () => {
    try {
        const savedNotification = localStorage.getItem('notification')
        return savedNotification ? JSON.parse(savedNotification) : [];
    } catch (error) {
        console.log(' Error loading notification from localstorage', error);
        return []
    }
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: loadNotificationFromStorage(),
        unreadCount:0

    },
    reducers: {
        addNotification: (state, action) => {
            const newNotification = {
                id: Date.now(),
                message: action.payload.message,
                type: action.payload.type || "info",
                read: false,
                timestamp: new Date().toLocaleString(),
            };
            state.notifications.unshift(newNotification);
            state.unreadCount += 1;
            localStorage.setItem('notification', JSON.stringify(state.notifications))
        },

        markAsRead: (state, action) => {
            const notification = state.notifications.find(
                (n) => n.id === action.payload
            );
            if (notification && !notification.read) {
                notification.read = true;
                state.unreadCount -= 1;
            }
            localStorage.setItem('notification', JSON.stringify(state.notifications))
        },
        markAsUnread: (state, action) => {
            const notification = state.notifications.find(
                (n) => n.id === action.payload
            );
            if (notification && notification.read) {
                notification.read = false
                state.unreadCount += 1;
            }
            localStorage.setItem('notification', JSON.stringify(state.notifications))
        },
        markAllAsRead: (state) => {
            state.notifications.forEach((n) => (n.read = true));
            state.unreadCount = 0;
            localStorage.setItem('notification', JSON.stringify(state.notifications))
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                (n) => n.id !== action.payload
            );
            localStorage.setItem('notification', JSON.stringify(state.notifications))
        },
        clearAllNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
            localStorage.setItem('notification', JSON.stringify([]))
        },
    }
})

export const {
    addNotification,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
