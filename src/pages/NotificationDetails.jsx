// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const NotificationDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const notification = useSelector(
//     (state) => state.notification.notifications.find((n) => n.id === id)
//   );

//   if (!notification) {
//     return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Notification not found</p>;
//   }

//   return (
//     <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
//       <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>
//         ← Back
//       </button>

//       <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem' }}>
//         <h4 style={{ marginBottom: '0.5rem' }}>{notification.message.message}</h4>
//         <small style={{ color: '#6c757d' }}>{notification.timestamp}</small>
//         <hr />
//         <p style={{ marginTop: '1rem', lineHeight: '1.6', color: '#333' }}>
//           {notification.message}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default NotificationDetails;