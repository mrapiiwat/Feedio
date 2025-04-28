import React, { useEffect, useState } from "react";
import dogImage from "../assets/dog.png";
import TotolFoodImage from "../assets/อาหารทั้งหมด.png";
import RemainingFoodImage from "../assets/อาหารเหลือ.png";
import IconFood from "../assets/iconfood.png";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../utils/api";


const HomePage: React.FC = () => {
  const [currentFood, setCurrentFood] = useState<number | null>(null);
  const [foodCapacity, setFoodCapacity] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [totalWeeklyFood, setTotalWeeklyFood] = useState<number | null>(null);
  const [leftoverWeeklyFood, setLeftoverWeeklyFood] = useState<number | null>(null);
  const [feeding, setFeeding] = useState<boolean>(false);

  // ใช้ซ้ำได้ทั้งตอนโหลดครั้งแรกและหลังให้อาหาร
  const loadFeederAndHistory = async () => {
    try {
      // Feeder
      const feederRes = await fetch(`${API_BASE_URL}/feeder/1`);
      if (!feederRes.ok) throw new Error("ไม่สามารถโหลดข้อมูลฟีดเดอร์ได้");
      const feederData = await feederRes.json();
      setCurrentFood(feederData.current_food);
      setFoodCapacity(feederData.food_capacity);

      // History
      const historyRes = await fetch(`${API_BASE_URL}/history`);
      if (!historyRes.ok) throw new Error("ไม่สามารถโหลดประวัติการให้อาหารได้");
      const historyData = await historyRes.json();

      const thisWeek = historyData.filter((item: any) => {
        const date = new Date(item.timestamp);
        const now = new Date();
        const thisWeekStart = new Date(now);
        thisWeekStart.setDate(now.getDate() - now.getDay());
        return date >= thisWeekStart;
      });

      const total = thisWeek.reduce((sum: number, item: any) => sum + (item.food_given || 0), 0);
      const leftover = thisWeek.reduce((sum: number, item: any) => sum + (item.food_left || 0), 0);

      setTotalWeeklyFood(total);
      setLeftoverWeeklyFood(leftover);
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    }
  };

  useEffect(() => {
    loadFeederAndHistory();
  }, []);

  const handleFeed = async () => {
    setFeeding(true);
    try {
      const res = await fetch('${API_BASE_URL}/history', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feeder_id: 1 }),
      });

      if (!res.ok) throw new Error("การให้อาหารล้มเหลว");

      await loadFeederAndHistory();
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถให้อาหารได้");
    } finally {
      setFeeding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="px-4 py-8"
    >
      <div className="bg-[#F9F3E3] min-h-screen">
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-center text-brown-800 font-kanit">
              ให้ Feedio ดูแลน้องหมาของคุณ 🐶
            </h1>
          </motion.div>

          <div className="flex justify-center my-4">
            <motion.img
              src={dogImage}
              alt="น้องหมาน่ารัก"
              className="rounded-xl shadow-lg mx-auto mt-6"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ width: "400px", height: "300px" }}
            />
          </div>

          {/* ปุ่มให้อาหาร */}
          <div className="flex justify-center">
            <button
              onClick={handleFeed}
              disabled={feeding}
              className={`bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl shadow-md ${
                feeding ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {feeding ? "🍲 กำลังให้อาหาร..." : "🍲 กดเพื่อให้อาหารสัตว์ของคุณ"}
            </button>
          </div>

          {/* อาหารคงเหลือ */}
          <img
            src={IconFood}
            alt="iconfood"
            className="rounded-xl mx-auto mt-6"
            style={{ width: "100px", height: "90px" }}
          />
          <div className="bg-[#E1DCDA] px-6 py-4 rounded-xl text-center shadow-md mx-auto w-[320px]">
            <p className="text-lg font-semibold text-[#4D2C1D] mb-2">
              ปริมาณอาหารคงเหลือ
            </p>
            <div className="text-5xl font-bold text-[#E94F1D]">
              {currentFood !== null ? `${currentFood.toFixed(1)} กรัม` : "โหลดข้อมูล..."}
            </div>
          </div>
          <p className="text-sm text-[#4D2C1D] mt-4 text-center">
            {error ? error : `ความจุสูงสุด: ${foodCapacity ?? "-"} กรัม`}
          </p>

          {/* สรุปอาทิตย์ */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-center">ใน 1 อาทิตย์...</h2>
            <div className="flex justify-center gap-8 mt-4">
              <div>
                <img
                  src={TotolFoodImage}
                  alt="อาหารทั้งหมด"
                  className="rounded-xl mx-auto mt-6"
                  style={{ width: "300px", height: "250px" }}
                />
                <p className="text-center mt-2 text-[#E94F1D]">
                  กินไปทั้งหมด
                  <br />
                  {totalWeeklyFood !== null ? `${totalWeeklyFood.toFixed(1)} กรัม` : "-"}
                </p>
              </div>
              <div>
                <img
                  src={RemainingFoodImage}
                  alt="อาหารเหลือ"
                  className="rounded-xl mx-auto mt-6"
                  style={{ width: "300px", height: "250px" }}
                />
                <p className="text-center mt-2 text-[#E94F1D]">
                  กินเหลือ
                  <br />
                  {leftoverWeeklyFood !== null ? `${leftoverWeeklyFood.toFixed(1)} กรัม` : "-"}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default HomePage;
