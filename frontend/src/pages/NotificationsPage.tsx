import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";

interface NotificationItem {
  id: number;
  message: string;
  read: boolean;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchNotifications()
    }
    fetchData();
  }, []);

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

  return (
    <div className="min-h-screen bg-[#fff8ed] px-6 py-10">
      <h1 className="text-2xl font-bold text-brown-800 mb-6 text-center">
        🔔 การแจ้งเตือนทั้งหมด
      </h1>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-600">ไม่มีรายการแจ้งเตือน</p>
      ) : (
        <ul className="space-y-3 max-w-xl mx-auto">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`p-4 rounded-xl shadow-md ${
                n.read
                  ? "bg-white text-gray-500"
                  : "bg-yellow-100 font-semibold text-gray-800"
              }`}
            >
              {n.message}
              {/* <span className="block text-black">{n.message || "(ไม่มีข้อความ)"}</span> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
