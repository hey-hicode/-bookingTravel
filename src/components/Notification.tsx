import { useEffect } from "react";
import { create } from "zustand";

interface NotificationState {
  message: string | null;
  type: "success" | "error" | "info";
  show: boolean;
  showNotification: (
    message: string,
    type: "success" | "error" | "info"
  ) => void;
  hideNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  message: null,
  type: "info",
  show: false,
  showNotification: (message, type) => {
    set({ message, type, show: true });
    setTimeout(() => {
      set({ show: false });
    }, 3000);
  },
  hideNotification: () => set({ show: false }),
}));

const Notification = () => {
  const { message, type, show, hideNotification } = useNotificationStore();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(hideNotification, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, hideNotification]);

  if (!show) return null;

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type];

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50`}
    >
      {message}
    </div>
  );
};

export default Notification;
