import React, { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "../utils/api";
import MealStatusTable from "../components/MealStatusTable";

const FeederDetailPage: React.FC = () => {
  const [feederData, _setFeederData] = useState<any>(null);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [cameraImageUrl, setCameraImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedAmount, setFeedAmount] = useState<number>(50); // ค่าเริ่มต้น
  const [successMessage, _setSuccessMessage] = useState<string>("");
  // const [dogId] = useState<string>("b293c543-ee70-4e15-a3d9-73dd0f00ad5d");
  const [_sumAmount, setSumAmount] = useState(0);
  const socketRef = useRef<WebSocket | null>(null);
  const ip = import.meta.env.VITE_IPADDRESS;
  //websocket

  useEffect(() => {
    fetch(`${API_BASE_URL}/history`)
      .then((res) => {
        if (!res.ok) throw new Error("ไม่สามารถโหลดประวัติการให้อาหารได้");
        return res.json();
      })
      .then((res) => res.json())
      .then((data) => setHistoryData(data))
      .catch((err) => console.error("History error:", err))
      .finally(() => setLoading(false));

    fetch(`${API_BASE_URL}/feeder/1/camera?t=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error("ไม่สามารถโหลดภาพกล้องได้");
        return res;
      })
      .then((res) => res.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setCameraImageUrl(imageUrl);
      })
      .catch((err) => console.error("ไม่สามารถโหลดภาพกล้อง:", err));
  }, []);

  useEffect(() => {
    const socket = new WebSocket(`ws://${ip}:8080`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to server");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("ข้อมูลจาก Arduino:", data);
    };

    socket.onerror = (event) => {
      console.log("Error:", event);
    };

    socket.onclose = () => {
      console.log("Disconnected from server");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleFeed = async () => {
    try {
      if (
        !socketRef.current ||
        socketRef.current.readyState !== WebSocket.OPEN
      ) {
        alert("ไม่สามารถใช้งานได้");
        return;
      }
      const payload = {
        status: 1,
        value: feedAmount, // ส่งค่าเลขตรงตามที่เลือกจาก dropdown
      };
      socketRef.current.send(JSON.stringify(payload));
      alert("กำลังให้อาหาร...");
    } catch (err) {
      console.log(err);
      alert("ไม่สามารถใช้งานได้");
    }
  };

  const manualFeeds = historyData.filter((item) => item.method === "manual");
  const manualFeedCount = manualFeeds.length;
  const manualFeedTotal = manualFeeds.reduce(
    (sum, item) => sum + (item.Given_Amount || 0),
    0
  );
  const lastFeedTime = feederData?.updated_at
    ? new Date(feederData.updated_at).toLocaleTimeString("th-TH")
    : "xx:xx";

  return (
    <div className="min-h-screen bg-[#FFF8ED] px-6 py-8">
      <h1 className="text-2xl font-bold text-center text-[#4D2C1D] mb-6">
        รายละเอียดการให้อาหาร
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* ตารางสถานะมื้ออาหาร */}
          <MealStatusTable />

          {/* ป้อนอาหารเอง */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-xl font-bold text-[#4D2C1D] mb-4">
              🍛 ป้อนอาหารเอง
            </h2>

            <label
              htmlFor="amount"
              className="block mb-1 text-sm font-medium text-[#4D2C1D]"
            >
              ระบุปริมาณอาหาร (หน่วย)
            </label>
            <div className="space-x-3">
              <select
                id="amount"
                className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 mb-4 text-center"
                value={feedAmount}
                onChange={(e) => setFeedAmount(Number(e.target.value))}
              >
                {[...Array(6)].map((_, i) => {
                  const value = 50 + i * 10;
                  return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                  );
                })}
              </select>

              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full shadow"
                onClick={handleFeed}
              >
                🍲 ให้อาหารตอนนี้
              </button>

              {/* แจ้งเตือน popup */}
              {successMessage && (
                <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
                  {successMessage}
                </div>
              )}
            </div>
          </div>

          {/* สรุปการให้อาหารเอง */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-[#4D2C1D]">
              📈 สรุปการให้อาหารเอง
            </h2>
            <p>
              จำนวนครั้งทั้งหมด:{" "}
              <span className="font-semibold">{manualFeedCount}</span> ครั้ง
            </p>
            <p>
              รวมทั้งหมด:{" "}
              <span className="font-semibold">
                {manualFeedTotal.toFixed(1)}
              </span>{" "}
              กรัม
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeederDetailPage;
