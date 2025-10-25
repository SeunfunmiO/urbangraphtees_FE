// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { ImNotification } from 'react-icons/im';
// import {
//   clearAllNotifications, clearNotificationsLocal,
//   deleteNotification, deleteNotificationLocal, fetchNotifications, markAllAsRead,
//   markAllAsReadLocal, markAsRead, markAsReadLocal, markAsUnread, markAsUnreadLocal, selectUnreadCount
// } from '../redux/notificationSlice';

// const Notification = () => {
//   const dispatch = useDispatch()
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [filter, setFilter] = useState('all')
//   const notifications = useSelector((state) => state.notification.notifications) || [];
//   const navigate = useNavigate()
//   const unreadCount = useSelector(selectUnreadCount);
//   const token = localStorage.getItem("token")
//   console.log(unreadCount);



//   useEffect(() => {
//     dispatch(fetchNotifications());
//   }, [dispatch]);

//   const handleMarkAsRead = (notif) => {
//     if (token) {
//       dispatch(markAsRead(notif._id))
//       setDropdownOpen(null)
//     } else {
//       dispatch(markAsReadLocal(notif._id))
//       setDropdownOpen(null)
//     }
//   }

//   const filteredNotifications = Array.isArray(notifications) ? notifications.filter(notif => {
//     if (filter === 'unread') return !notif.read;
//     if (filter === 'read') return notif.read;
//     return true;
//   }) : [];

//   const typeColors = {
//     success: '#198754',
//     info: '#0dcaf0',
//     warning: '#ffc107',
//     danger: '#dc3545',
//     black: '#000000',
//     new: '#212529'
//   };

//   return (
//     <div style={{ padding: '3rem 1rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
//       <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//         <div className='d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2'>
//           <div>
//             <h3 style={{ marginBottom: '0.25rem' }}>Notifications</h3>
//             <p style={{ color: '#6c757d', marginBottom: 0 }}>
//               You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
//             </p>
//           </div>
//           <div style={{ position: 'relative' }}>
//             <button
//               className="btn btn-outline-secondary btn-small"
//               onClick={() => setDropdownOpen(dropdownOpen === 'main' ? null : 'main')}
//               style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
//             >
//               Actions
//               <span>▼</span>
//             </button>
//             {dropdownOpen === 'main' && (
//               <div className='dropDown mark-pd' style={{
//                 position: 'absolute',
//                 right: 0,
//                 top: '100%',
//                 marginTop: '0.25rem',
//                 backgroundColor: 'white',
//                 border: '1px solid #dee2e6',
//                 borderRadius: '0.375rem',
//                 boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)',
//                 minWidth: '160px',
//                 zIndex: 1000
//               }}>
//                 <button
//                   onClick={() => dispatch(token ? markAllAsRead() : markAllAsReadLocal())}
//                   style={{
//                     width: '100%',
//                     padding: '0.5rem 1rem',
//                     border: 'none',
//                     backgroundColor: 'transparent',
//                     textAlign: 'left',
//                     cursor: 'pointer'
//                   }}
//                   onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
//                   onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                 >
//                   Mark all as read
//                 </button>
//                 <button
//                   onClick={() => dispatch(token ? clearAllNotifications() : clearNotificationsLocal())}
//                   style={{
//                     width: '100%',
//                     padding: '0.5rem 1rem',
//                     border: 'none',
//                     backgroundColor: 'transparent',
//                     textAlign: 'left',
//                     cursor: 'pointer',
//                     color: '#dc3545'
//                   }}
//                   onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
//                   onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                 >
//                   Clear all
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>


//         <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
//           <button
//             onClick={() => setFilter('all')}
//             style={{
//               padding: '0.5rem 1rem',
//               border: '1px solid',
//               borderColor: filter === 'all' ? 'black' : '#dee2e6',
//               backgroundColor: filter === 'all' ? 'black' : 'white',
//               color: filter === 'all' ? 'white' : '#212529',
//               borderRadius: '0.375rem',
//               cursor: 'pointer',
//               fontSize: '13px'
//             }}
//           >
//             All ({notifications.length})
//           </button>
//           <button
//             onClick={() => setFilter('unread')}
//             style={{
//               padding: '0.5rem 1rem',
//               border: '1px solid',
//               borderColor: filter === 'unread' ? 'black' : '#dee2e6',
//               backgroundColor: filter === 'unread' ? 'black' : 'white',
//               color: filter === 'unread' ? 'white' : '#212529',
//               borderRadius: '0.375rem',
//               cursor: 'pointer',
//               fontSize: '13px'
//             }}
//           >
//             Unread ({unreadCount})
//           </button>
//           <button
//             onClick={() => setFilter('read')}
//             style={{
//               padding: '0.5rem 1rem',
//               border: '1px solid',
//               borderColor: filter === 'read' ? 'black' : '#dee2e6',
//               backgroundColor: filter === 'read' ? 'black' : 'white',
//               color: filter === 'read' ? 'white' : '#212529',
//               borderRadius: '0.375rem',
//               cursor: 'pointer',
//               fontSize: '13px'
//             }}
//           >
//             Read ({notifications.length > 0 ? notifications.length - unreadCount : 1})
//           </button>
//         </div>


//         <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)' }}>
//           {filteredNotifications.length === 0 ? (
//             <div className="text-center my-5 py-5">
//               <ImNotification size={40} color="lightgray" />
//               <p className="text-muted mt-3">No notifications yet</p>
//               <Link to="/shop" className="btn btn-dark mt-3">
//                 Start Shopping
//               </Link>
//             </div>
//           ) : (
//             filteredNotifications.map((notif, index) => (
//               <div
//                 key={notif._id}
//                 style={{
//                   padding: '1rem',
//                   borderBottom: index < filteredNotifications.length - 1 ? '1px solid #dee2e6' : 'none',
//                   backgroundColor: !notif.isRead ? '#f8f9fa' : 'white'
//                 }}
//               >
//                 <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
//                   {/* <div
//                     style={{
//                       width: '10px',
//                       height: '10px',
//                       borderRadius: '50%',
//                       backgroundColor: '#212529',
//                       color: 'white',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: '20px',
//                       flexShrink: 0
//                     }}
//                   >
//                     {notif.icon}
//                   </div> */}
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
//                       <div
//                         style={{ flex: 1, cursor: 'pointer' }}
//                         onClick={() => {
//                           dispatch(handleMarkAsRead(notif._id));
//                           navigate(`/notifications/${notif._id}`);
//                         }}
//                       >
//                         <h6 style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
//                           {notif.message}
//                           {!notif.read && (
//                             <span style={{
//                               backgroundColor: typeColors[notif.type] || '#212529',
//                               color: 'white',
//                               padding: '0.25rem 0.5rem',
//                               borderRadius: '0.25rem',
//                               fontSize: '0.75rem'
//                             }}>
//                               New
//                             </span>
//                           )}
//                         </h6>
//                         <p style={{
//                           marginBottom: '0.25rem', color: '#6c757d', cursor: 'pointer'
//                         }}
//                         >{notif.message}</p>
//                         <small style={{ color: '#6c757d' }}>{notif.createdAt}</small>
//                       </div>
//                       <div style={{ position: 'relative' }}>
//                         <button
//                           onClick={() => setDropdownOpen(dropdownOpen === notif._id ? null : notif._id)}
//                           style={{
//                             border: 'none',
//                             backgroundColor: 'transparent',
//                             color: '#6c757d',
//                             cursor: 'pointer',
//                             fontSize: '1.5rem',
//                             padding: '0 0.5rem',
//                             lineHeight: 1
//                           }}
//                         >
//                           ⋮
//                         </button>
//                         {dropdownOpen === notif._id && (
//                           <div style={{
//                             position: 'absolute',
//                             right: 0,
//                             top: '100%',
//                             marginTop: '0.25rem',
//                             backgroundColor: 'white',
//                             border: '1px solid #dee2e6',
//                             borderRadius: '0.375rem',
//                             boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)',
//                             minWidth: '140px',
//                             zIndex: 1000
//                           }}>
//                             {!notif.read && (
//                               <button
//                                 onClick={() => dispatch(token ? markAsRead(notif._id) : markAsReadLocal(notif._id))}
//                                 style={{
//                                   width: '100%',
//                                   padding: '0.5rem 1rem',
//                                   border: 'none',
//                                   backgroundColor: 'transparent',
//                                   textAlign: 'left',
//                                   cursor: 'pointer'
//                                 }}
//                                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
//                                 onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                               >
//                                 Mark as read
//                               </button>
//                             )}
//                             {notif.read && (
//                               <button
//                                 onClick={() => dispatch(token ? markAsUnread(notif._id) : markAsUnreadLocal(notif._id))}
//                                 style={{
//                                   width: '100%',
//                                   padding: '0.5rem 1rem',
//                                   border: 'none',
//                                   backgroundColor: 'transparent',
//                                   textAlign: 'left',
//                                   cursor: 'pointer'
//                                 }}
//                                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
//                                 onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                               >
//                                 Mark as unread
//                               </button>
//                             )}
//                             <button
//                               onClick={() => dispatch(token ? deleteNotification(notif._id) : deleteNotificationLocal(notif._id))}
//                               style={{
//                                 width: '100%',
//                                 padding: '0.5rem 1rem',
//                                 border: 'none',
//                                 backgroundColor: 'transparent',
//                                 textAlign: 'left',
//                                 cursor: 'pointer',
//                                 color: '#dc3545'
//                               }}
//                               onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
//                               onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Notification

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

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [filter, setFilter] = useState('all');

  const notifications = useSelector((state) => state.notification.notifications) || [];
  const unreadCount = useSelector(selectUnreadCount);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

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
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <div>
            <h3 style={{ marginBottom: '0.25rem' }}>Notifications</h3>
            <p className="text-muted mb-0">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Actions Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setDropdownOpen(dropdownOpen === 'main' ? null : 'main')}
            >
              Actions ▼
            </button>
            {dropdownOpen === 'main' && (
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

        {/* Filter Buttons */}
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

        {/* Notification List */}
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
                      dispatch(token ? markAsRead(notif._id) : markAsReadLocal(notif._id));
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: notif.isRead ? 400 : 600 }}>
                      {notif.message}
                    </p>
                    <small className="text-muted">
                      {new Date(notif.createdAt).toLocaleString()}
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