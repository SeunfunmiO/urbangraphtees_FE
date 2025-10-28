
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ImNotification } from 'react-icons/im';
import {
  clearAllNotifications,
  clearNotificationsLocal,
  deleteNotification,
  deleteNotificationLocal,
  fetchNotifications,
  markAllAsRead,
  markAllAsReadLocal,
  markAsRead,
  markAsReadLocal,
  markAsUnread,
  markAsUnreadLocal,
  selectUnreadCount
} from '../redux/notificationSlice';
import { formatDistanceToNow } from 'date-fns';

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [filter, setFilter] = useState('all');

  const notifications = useSelector((state) => state.notification.items) || [];
  const unreadCount = useSelector(selectUnreadCount);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (notif) => {
    if (token) {
      dispatch(markAsRead(notif._id))
      navigate(`/notifications/${notif._id}`);
    } else {
      dispatch(markAsReadLocal(notif._id))
      navigate(`/notifications/${notif._id}`);
    }
  }

  const filteredNotifications = Array.isArray(notifications)
    ? notifications.filter((notif) => {
      if (filter === 'unread') return !notif.isRead;
      if (filter === 'read') return notif.isRead;
      return true;
    })
    : [];

  const typeColors = {
    success: '#198754',
    info: '#0dcaf0',
    warning: '#ffc107',
    error: '#dc3545',
  };

  return (
    <div style={{ padding: '3rem 1rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <div>
            <h3 style={{ marginBottom: '0.25rem' }}>Notifications</h3>
            <p className="text-muted mb-0">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setDropdownOpen(dropdownOpen === 'main' ? null : 'main')}
            >
              Actions ▼
            </button>
            {dropdownOpen === 'main' && (
              <div
                className='mark-pd'
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '0.25rem',
                  backgroundColor: 'white',
                  border: '1px solid #dee2e6',
                  borderRadius: '0.375rem',
                  boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)',
                  minWidth: '160px',
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={() => {
                    dispatch(token ? markAllAsRead() : markAllAsReadLocal());
                    setDropdownOpen(null);
                  }}
                  className="dropdown-item w-100 text-start px-3 py-2 border-0 bg-transparent"
                >
                  Mark all as read
                </button>
                <button
                  onClick={() => {
                    dispatch(token ? clearAllNotifications() : clearNotificationsLocal());
                    setDropdownOpen(null);
                  }}
                  className="dropdown-item w-100 text-start px-3 py-2 border-0 bg-transparent text-danger"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex gap-2 mb-4 flex-wrap">
          {['all', 'unread', 'read'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid',
                borderColor: filter === cat ? '#000' : '#dee2e6',
                backgroundColor: filter === cat ? '#000' : '#fff',
                color: filter === cat ? '#fff' : '#212529',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}{' '}
              {cat === 'all'
                ? (`${notifications.length}`)
                : cat === 'unread'
                  ? (`${unreadCount}`)
                  : (Math.max(0, `${notifications.length - unreadCount}`))}
            </button>
          ))}
        </div>

        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)',
          }}
        >
          {filteredNotifications.length === 0 ? (
            <div className="text-center my-5 py-5">
              <ImNotification size={40} color="lightgray" />
              <p className="text-muted mt-3">No notifications yet</p>
              <Link to="/shop" className="btn btn-dark mt-3">
                Start Shopping
              </Link>
            </div>
          ) : (
            filteredNotifications.map((notif, index) => (
              <div
                key={notif._id}
                style={{
                  padding: '1rem',
                  borderBottom:
                    index < filteredNotifications.length - 1
                      ? '1px solid #dee2e6'
                      : 'none',
                  backgroundColor: notif.isRead ? '#fff' : '#f8f9fa',
                  transition: 'background 0.3s ease',
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div
                    style={{ flex: 1, cursor: 'pointer' }}
                    onClick={() => {
                      handleMarkAsRead(notif._id)
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: notif.isRead ? 400 : 600 }}>
                      {notif.message}
                    </p>
                    <small className="text-muted">
                      {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                    </small>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() =>
                        setDropdownOpen(dropdownOpen === notif._id ? null : notif._id)
                      }
                      style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#6c757d',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                      }}
                    >
                      ⋮
                    </button>
                    {dropdownOpen === notif._id && (
                      <div
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: '100%',
                          marginTop: '0.25rem',
                          backgroundColor: 'white',
                          border: '1px solid #dee2e6',
                          borderRadius: '0.375rem',
                          boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)',
                          minWidth: '140px',
                          zIndex: 1000,
                        }}
                      >
                        {!notif.isRead ? (
                          <button
                            onClick={() =>
                              dispatch(token ? markAsRead(notif._id) : markAsReadLocal(notif._id))
                            }
                            className="dropdown-item w-100 text-start px-3 py-2 border-0 bg-transparent"
                          >
                            Mark as read
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              dispatch(
                                token
                                  ? markAsUnread(notif._id)
                                  : markAsUnreadLocal(notif._id)
                              )
                            }
                            className="dropdown-item w-100 text-start px-3 py-2 border-0 bg-transparent"
                          >
                            Mark as unread
                          </button>
                        )}
                        <button
                          onClick={() =>
                            dispatch(
                              token
                                ? deleteNotification(notif._id)
                                : deleteNotificationLocal(notif._id)
                            )
                          }
                          className="dropdown-item w-100 text-start px-3 py-2 border-0 bg-transparent text-danger"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;