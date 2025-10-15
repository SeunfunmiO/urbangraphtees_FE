import { createSlice } from "@reduxjs/toolkit";

const loadNotificationsFromStorage = () => {
    try {
        const savedNotification = localStorage.getItem('notifications')
        return savedNotification ? JSON.parse(savedNotification) : [];
    } catch (error) {
        console.log(' Error loading notifications from localstorage', error);
        return []
    }
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: loadNotificationsFromStorage(),
        unreadCount: loadNotificationsFromStorage().filter(n => !n.read).length,
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
            localStorage.setItem('notifications', JSON.stringify(state.notifications))
        },

        markAsRead: (state, action) => {
            const notif = state.notifications.find(
                (n) => n.id === action.payload
            );
            if (notif && !notif.read) {
                notif.read = true;
                state.unreadCount -= 1;
            }
            localStorage.setItem('notifications', JSON.stringify(state.notifications))
        },
        markAsUnread: (state, action) => {
            const notif = state.notifications.find(
                (n) => n.id === action.payload
            );
            if (notif && notif.read) {
                notif.read = false
                state.unreadCount += 1;
            }
            localStorage.setItem('notifications', JSON.stringify(state.notifications))
        },
        markAllAsRead: (state) => {
            state.notifications.forEach((n) => (n.read = true));
            state.unreadCount = 0;
            localStorage.setItem('notifications', JSON.stringify(state.notifications))
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                (n) => n.id !== action.payload
            );
            localStorage.setItem('notifications', JSON.stringify(state.notifications))
        },
        clearAllNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
            localStorage.setItem('notifications', JSON.stringify([]))
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
