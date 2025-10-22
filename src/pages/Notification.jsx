import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAllNotifications, fetchNotifications, markAllAsRead, markAsRead, markAsUnread, removeNotification } from '../redux/notificationSlice';

const Notification = () => {
  const dispatch = useDispatch()
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [filter, setFilter] = useState('all')
  const notifications = useSelector((state) => state.notification.notifications) || [];
  //name.intialstate
  const unreadCount = Array.isArray(notifications) ? notifications.filter(n => !n.read).length : 0;
  const navigate = useNavigate()
  // const { items } = useSelector(state => state.notifications);
  // const unreadCount = useSelector((state) => state.notifications.unreadCount);


  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (notif)=>{
    dispatch(markAsRead(notif._id))
    setDropdownOpen(null)
  }
  // import React, { useEffect } from "react";
  // import { useDispatch, useSelector } from "react-redux";
  // import {
  //   fetchNotifications,
  //   markAsRead,
  //   deleteNotification,
  //   clearAllNotifications
  // } from "../redux/notificationSlice";




  //   return (
  //     <div>
  //       <h4>Notifications</h4>
  //       {loading && <p>Loading...</p>}

  //       {items.length === 0 && <p>No notifications yet.</p>}

  //       {items.map((n) => (
  //         <div key={n._id} style={{ borderBottom: "1px solid #eee", padding: "10px" }}>
  //           <p style={{ fontWeight: n.isRead ? "normal" : "bold" }}>{n.message}</p>
  //           <div>
  //             <button onClick={() => dispatch(markAsRead(n._id))}>Mark as Read</button>
  //             <button onClick={() => dispatch(deleteNotification(n._id))}>Delete</button>
  //           </div>
  //         </div>
  //       ))}

  //       {items.length > 0 && (
  //         <button onClick={() => dispatch(clearAllNotifications())}>
  //           Clear All
  //         </button>
  //       )}
  //     </div>
  //   );
  // }

  const filteredNotifications = Array.isArray(notifications) ? notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  }) : [];

  const typeColors = {
    success: '#198754',
    info: '#0dcaf0',
    warning: '#ffc107',
    danger: '#dc3545',
    black: '#000000',
    new: '#212529'
  };

  return (
    <div style={{ padding: '3rem 1rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className='d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2'>
          <div>
            <h3 style={{ marginBottom: '0.25rem' }}>Notifications</h3>
            <p style={{ color: '#6c757d', marginBottom: 0 }}>
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-outline-secondary btn-small"
              onClick={() => setDropdownOpen(dropdownOpen === 'main' ? null : 'main')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Actions
              <span>▼</span>
            </button>
            {dropdownOpen === 'main' && (
              <div className='dropDown mark-pd' style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                marginTop: '0.25rem',
                backgroundColor: 'white',
                border: '1px solid #dee2e6',
                borderRadius: '0.375rem',
                boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)',
                minWidth: '160px',
                zIndex: 1000
              }}>
                <button
                  onClick={() => dispatch(markAllAsRead())}
                  style={{
                    width: '100%',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Mark all as read
                </button>
                <button
                  onClick={() => dispatch(clearAllNotifications())}
                  style={{
                    width: '100%',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#dc3545'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>


        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid',
              borderColor: filter === 'all' ? 'black' : '#dee2e6',
              backgroundColor: filter === 'all' ? 'black' : 'white',
              color: filter === 'all' ? 'white' : '#212529',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid',
              borderColor: filter === 'unread' ? 'black' : '#dee2e6',
              backgroundColor: filter === 'unread' ? 'black' : 'white',
              color: filter === 'unread' ? 'white' : '#212529',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid',
              borderColor: filter === 'read' ? 'black' : '#dee2e6',
              backgroundColor: filter === 'read' ? 'black' : 'white',
              color: filter === 'read' ? 'white' : '#212529',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            Read ({notifications.length - unreadCount})
          </button>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)' }}>
          {filteredNotifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p style={{ color: '#6c757d', marginBottom: 0 }}>No notifications to display</p>
            </div>
          ) : (
            filteredNotifications.map((notif, index) => (
              <div
                key={notif._id}
                style={{
                  padding: '1rem',
                  borderBottom: index < filteredNotifications.length - 1 ? '1px solid #dee2e6' : 'none',
                  backgroundColor: !notif.read ? '#f8f9fa' : 'white'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  {/* <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#212529',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      flexShrink: 0
                    }}
                  >
                    {notif.icon}
                  </div> */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                      <div
                        style={{ flex: 1, cursor: 'pointer' }}
                        onClick={() => {
                          dispatch(handleMarkAsRead(notif._id));
                          navigate(`/notifications/${notif._id}`);
                        }}
                      >
                        <h6 style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {notif.title}
                          {!notif.read && (
                            <span style={{
                              backgroundColor: typeColors[notif.type] || '#212529',
                              color: 'white',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.25rem',
                              fontSize: '0.75rem'
                            }}>
                              New
                            </span>
                          )}
                        </h6>
                        <p style={{
                          marginBottom: '0.25rem', color: '#6c757d', cursor: 'pointer'
                        }}
                        >{notif.message}</p>
                        <small style={{ color: '#6c757d' }}>{notif.createdAt}</small>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <button
                          onClick={() => setDropdownOpen(dropdownOpen === notif._id ? null : notif._id)}
                          style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: '#6c757d',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            padding: '0 0.5rem',
                            lineHeight: 1
                          }}
                        >
                          ⋮
                        </button>
                        {dropdownOpen === notif._id && (
                          <div style={{
                            position: 'absolute',
                            right: 0,
                            top: '100%',
                            marginTop: '0.25rem',
                            backgroundColor: 'white',
                            border: '1px solid #dee2e6',
                            borderRadius: '0.375rem',
                            boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)',
                            minWidth: '140px',
                            zIndex: 1000
                          }}>
                            {!notif.read && (
                              <button
                                onClick={() => dispatch(markAsRead(notif._id))}
                                style={{
                                  width: '100%',
                                  padding: '0.5rem 1rem',
                                  border: 'none',
                                  backgroundColor: 'transparent',
                                  textAlign: 'left',
                                  cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              >
                                Mark as read
                              </button>
                            )}
                            {notif.read && (
                              <button
                                onClick={() => dispatch(markAsUnread(notif._id))}
                                style={{
                                  width: '100%',
                                  padding: '0.5rem 1rem',
                                  border: 'none',
                                  backgroundColor: 'transparent',
                                  textAlign: 'left',
                                  cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              >
                                Mark as unread
                              </button>
                            )}
                            <button
                              onClick={() => dispatch(removeNotification(notif._id))}
                              style={{
                                width: '100%',
                                padding: '0.5rem 1rem',
                                border: 'none',
                                backgroundColor: 'transparent',
                                textAlign: 'left',
                                cursor: 'pointer',
                                color: '#dc3545'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification