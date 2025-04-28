import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/api";

const FeederDetailPage: React.FC = () => {
  const [feederData, setFeederData] = useState<any>(null);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [cameraImageUrl, setCameraImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedAmount, setFeedAmount] = useState<number>(50); // ค่าเริ่มต้น
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/feeder/1`)
      .then((res) => {
        if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลฟีดเดอร์ได้");
        return res.json();
      })
      .then((res) => res.json())
      .then((data) => setFeederData(data))
      .catch((err) => console.error("Feeder error:", err));

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

  const handleFeed = () => {
    fetch(`${API_BASE_URL}/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feeder_id: 1,
        method: "manual",
        given_amount: feedAmount,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setSuccessMessage(`ให้อาหาร ${feedAmount} กรัม เรียบร้อยแล้ว!`);
        setTimeout(() => {
          setSuccessMessage("");
          window.location.reload(); // โหลดใหม่เพื่ออัปเดตข้อมูล
        }, 2000);
      })
      .catch((err) => {
        console.error("Feed error:", err);
        alert("เกิดข้อผิดพลาดในการให้อาหาร");
      });
  };

  const manualFeeds = historyData.filter((item) => item.method === "manual");
  const manualFeedCount = manualFeeds.length;
  const manualFeedTotal = manualFeeds.reduce((sum, item) => sum + (item.given_amount || 0), 0);
  const lastFeedTime = feederData?.updated_at
    ? new Date(feederData.updated_at).toLocaleTimeString("th-TH")
    : "xx:xx";

  const isMealGiven = (hourRange: [number, number]) => {
    const today = new Date().toISOString().split("T")[0];
    return historyData.some((item) => {
      const date = new Date(item.timestamp);
      const itemDate = date.toISOString().split("T")[0];
      const hour = date.getHours();
      return itemDate === today && hour >= hourRange[0] && hour < hourRange[1];
    });
  };

  const morningDone = isMealGiven([6, 10]);
  const noonDone = isMealGiven([11, 14]);
  const eveningDone = isMealGiven([17, 20]);

  return (
    <div className="min-h-screen bg-[#FFF8ED] px-6 py-8">
      <h1 className="text-2xl font-bold text-center text-[#4D2C1D] mb-6">รายละเอียดการให้อาหาร</h1>

      {loading ? (
        <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* รูปจากกล้อง */}
          <div className="flex justify-center">
            {cameraImageUrl ? (
              <img
                src={cameraImageUrl}
                alt="ภาพจากกล้อง"
                className="w-[250px] h-[200px] rounded-xl shadow object-cover"
              />
            ) : (
              <p className="text-gray-400">ไม่พบภาพจากกล้อง</p>
            )}
          </div>

          {/* ตารางสถานะมื้ออาหาร */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-[#4D2C1D]">🍽 สถานะมื้ออาหารวันนี้</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                ☀️ เช้า (07:00)
                <span className={`font-bold ${morningDone ? "text-green-600" : "text-gray-400"}`}>
                  {morningDone ? "✔️ ให้แล้ว" : "⏳ ยังไม่ได้ให้"}
                </span>
              </li>
              <li className="flex justify-between">
                🌤 กลางวัน (12:00)
                <span className={`font-bold ${noonDone ? "text-green-600" : "text-gray-400"}`}>
                  {noonDone ? "✔️ ให้แล้ว" : "⏳ ยังไม่ได้ให้"}
                </span>
              </li>
              <li className="flex justify-between">
                🌙 เย็น (18:00)
                <span className={`font-bold ${eveningDone ? "text-green-600" : "text-gray-400"}`}>
                  {eveningDone ? "✔️ ให้แล้ว" : "⏳ ยังไม่ได้ให้"}
                </span>
              </li>
            </ul>
          </div>

          {/* ป้อนอาหารเอง */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-xl font-bold text-[#4D2C1D] mb-4">🍛 ป้อนอาหารเอง</h2>

            <label htmlFor="amount" className="block mb-1 text-sm font-medium text-[#4D2C1D]">
              ระบุปริมาณอาหาร (กรัม)
            </label>
            <input
              type="number"
              id="amount"
              className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 mb-4 text-center"
              value={feedAmount}
              onChange={(e) => setFeedAmount(Number(e.target.value))}
              min={1}
              max={500}
            />

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

            <p className="text-sm mt-4 text-gray-600">
              ปริมาณอาหารที่เหลือในถัง:{" "}
              <span className="font-semibold text-red-600">
                {feederData?.current_food?.toFixed(1) || "0"} กรัม
              </span>
            </p>
            <p className="text-xs text-gray-400">อัปเดตล่าสุด: {lastFeedTime} น.</p>
          </div>

          {/* สรุปการให้อาหารเอง */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-[#4D2C1D]">📈 สรุปการให้อาหารเอง</h2>
            <p>จำนวนครั้งทั้งหมด: <span className="font-semibold">{manualFeedCount}</span> ครั้ง</p>
            <p>รวมทั้งหมด: <span className="font-semibold">{manualFeedTotal.toFixed(1)}</span> กรัม</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeederDetailPage;
