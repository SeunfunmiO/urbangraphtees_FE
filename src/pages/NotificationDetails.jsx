import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markAsRead, markAsReadLocal } from '../redux/notificationSlice';
import { ImNotification } from 'react-icons/im';
import { formatDistanceToNow } from 'date-fns';


const NotificationDetails = () => {
    // const { id } = useParams();
    const navigate = useNavigate();
    const notifications = useSelector((state) => state.notification.items || [])
    // const notification = notifications.find((n) => n._id === id)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch])

    useEffect(() => {

        if (notifications && !notifications.isRead) {
            if (token) {
                dispatch(markAsRead(notifications._id))

            }
            else {
                dispatch(markAsReadLocal(notifications._id))
            }
        }
    }, [token, notifications, dispatch]);

    if (!notifications) {
        return (
            <div className="text-center my-5 py-5">
                <ImNotification size={40} color="lightgray" />
                <p className="text-muted mt-3">Notification not found</p>
                <button onClick={() => navigate(-1)} className="btn bg-black text-white">Go Back</button>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem', textTransform: 'capitalize' }}>{notifications.type}</h4>
                {/* <small style={{ color: '#6c757d' }}>{formatDistanceToNow(new Date(notifications.createdAt), { addSuffix: true })}</small> */}
                <hr />
                <p style={{ marginTop: '1rem', lineHeight: '1.6', color: '#333' }}>
                    {notifications.message}
                </p>
            </div>
            <button className="btn btn-outline-dark mb-3" onClick={() => navigate(-1)}>
                ← Back to Notifications
            </button>
        </div>
    );
};

export default NotificationDetails;