import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} />;
      case 'error': return <AlertCircle size={20} />;
      case 'warning': return <AlertTriangle size={20} />;
      case 'info': return <Info size={20} />;
      default: return <Info size={20} />;
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-content">
            <div className="notification-icon">
              {getIcon(notification.type)}
            </div>
            <div className="notification-text">
              <h4 className="notification-title">{notification.title}</h4>
              <p className="notification-message">{notification.message}</p>
            </div>
          </div>
          <button
            className="notification-close"
            onClick={() => removeNotification(notification.id)}
            title="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default NotificationContainer;
