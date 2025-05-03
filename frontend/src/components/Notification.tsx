import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../utils/api"; 

interface NotificationItem {
  id: number;
  message: string;
  read: boolean;
}

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    // { id: 1, message: "อาหารเหลือเพียง 20% แล้ว", read: false },
    // { id: 2, message: "ระบบทำการให้อาหารรอบเย็นสำเร็จ", read: true },
    // { id: 3, message: "สุนัขของคุณมากินข้าวแล้ว", read: false },
  ]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/noti`);
        const notiList = res.data.getNoti.map((n: any, index: number) => ({
          id: index + 1,
          message: n.Message,
          read: false,
        }));
        setNotifications(notiList);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const goToAllNotifications = () => {
    setIsOpen(false);
    navigate("/notifications");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-2xl hover:text-yellow-500 transition"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 font-semibold border-b">การแจ้งเตือน</div>

          <ul className="max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="px-4 py-3 text-center text-gray-500">ไม่มีแจ้งเตือน</li>
            ) : (
              notifications.map((n) => (
                <li
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    !n.read ? "font-bold text-gray-800" : "text-gray-500"
                  }`}
                >
                  {n.message}
                </li>
              ))
            )}
          </ul>

          <div className="border-t px-4 py-2 text-right">
            <button
              onClick={goToAllNotifications}
              className="text-blue-600 text-sm hover:underline"
            >
              ดูทั้งหมด →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}