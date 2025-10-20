import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead } from '../redux/notificationSlice';

const NotificationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const notifications = useSelector(
        (state) => state.notifications.notifications)
    const notification = notifications.find((n) => n._id == id)
    const dispatch = useDispatch()

    useEffect(() => {
        if (notification && !notification.read) {
            dispatch(markAsRead(notification._id))
        }
    }, [notification, dispatch])

    if (!notification) {
        return (
            <div className="text-center p-2">
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>Notification not found</p>
                <button onClick={() => navigate(-1)} className="btn bg-black text-white">Go Back</button>
            </div>)
    }

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem', textTransform: 'capitalize' }}>{notification.type}</h4>
                <small style={{ color: '#6c757d' }}>{notification.createdAt}</small>
                <hr />
                <p style={{ marginTop: '1rem', lineHeight: '1.6', color: '#333' }}>
                    {notification.message}
                </p>
            </div>
            <button className="btn btn-outline-dark mb-3" onClick={() => navigate(-1)}>
                ← Back to Notifications
            </button>
        </div>
    );
};

export default NotificationDetails;