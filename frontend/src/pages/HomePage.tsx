import React, { useEffect, useState } from "react";
import axios from "axios";

import TotolFoodImage from "../assets/อาหารทั้งหมด.png";
import RemainingFoodImage from "../assets/อาหารเหลือ.png";
import IconFood from "../assets/iconfood.png";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(utc);
dayjs.extend(isoWeek);

const HomePage: React.FC = () => {
  const [remainingInTray, setRemainingInTray] = useState<number | null>(null);
  const [totalWeeklyFood, setTotalWeeklyFood] = useState<number | null>(null);
  const [leftoverWeeklyFood, setLeftoverWeeklyFood] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [latestImage, setLatestImage] = useState<string | null>(null);
  const [imageTimestamp, setImageTimestamp] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadHistory = async () => {
    try {
      const historyRes = await axios.get(`${API_BASE_URL}/history`);
      const historyData = historyRes.data.history;

      const historyLatestRes = await axios.get(
        `${API_BASE_URL}/history?isNow=${true}`
      );
      const historyLatestData = historyLatestRes.data.history;

      //เอา record ล่าสุด (เรียงวันที่จากใหม่ไปเก่า)
      const latest = historyLatestData[0];
      setRemainingInTray(latest?.Remaining_Amount ?? null);

      //filter ข้อมูลของสัปดาห์นี้
      const thisWeek = historyData.reduce(
        (latest: { Date: string }, current: { Date: string }) =>
          dayjs.utc(current.Date).isAfter(dayjs.utc(latest?.Date))
            ? current?.Date
            : latest?.Date
      );

      const filteredWeek = historyData.filter((h: { Date: string }) =>
        dayjs.utc(h.Date).isSame(dayjs.utc(thisWeek), "isoWeek")
      );

      const total = filteredWeek.reduce(
        (sum: number, item: { Given_Amount: number }) =>
          sum + (item.Given_Amount || 0),
        0
      );
      const leftover = filteredWeek.reduce(
        (sum: number, item: { Remaining_Amount: number }) =>
          sum + (item.Remaining_Amount || 0),
        0
      );

      setTotalWeeklyFood(total);
      setLeftoverWeeklyFood(leftover);
    } catch (err) {
      console.error(err);
      setError("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadHistory();
    };
    fetchData();
  }, []);

  const goToFeederDetail = () => {
    navigate("/feederdetail");
  };

  // useEffect(() => {
  //   const weights = async () => {
  //     try {
  //       const res = await axios.get(`${API_BASE_URL}/weightSensor`);
  //       const weightData = res;
  //       console.log(weightData);

  //       const latestWeight =weightData.data.getAllWeights[0].Measured_Weight;
  //       setRemainingInTray(latestWeight);
  //     } catch (err) {
  //       console.error(err);
  //       setError("เกิดข้อผิดพลาดในการโหลดข้อมูลน้ำหนัก");
  //     }
  //   };
  //   weights();
  // }, [remainingInTray]);



  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/weightSensor`);
        const latestWeight = res.data.getAllWeights[0].Measured_Weight || 0;
        setRemainingInTray(latestWeight);
        console.log(res);
      } catch (err) {
        console.error(err);
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูลน้ำหนัก");
      }
    }, 3000); 

    return () => clearInterval(interval); // ล้าง interval
  }, []);

  // โหลดรูปภาพล่าสุดเมื่อเริ่มต้น
  useEffect(() => {

    const fetchLatestImage = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/latest-image`);
        console.log('Latest image data:', res.data);
        if (res.data && res.data.path) {
          setLatestImage(`${API_BASE_URL}${res.data.path}`);
          setImageTimestamp(dayjs(res.data.timestamp).format('DD/MM/YYYY HH:mm:ss'));
        }
      } catch (err) {
        console.error('ไม่พบรูปภาพล่าสุด:', err);
        // ไม่ต้องแสดง error ถ้ายังไม่มีรูปภาพ
      }
    };
    
    fetchLatestImage();

  }, []);

  const remainingText = `${Number(remainingInTray).toFixed(1)} กรัม`;

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

          <div className="flex flex-col items-center my-4">
            <div className="relative">
              {latestImage ? (
                <motion.img
                  src={latestImage}
                  alt="น้องหมาน่ารัก"
                  className="rounded-xl shadow-lg mx-auto mt-6 w-[400px] h-[300px] object-cover"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              ) : (
                <motion.div 
                  className="rounded-xl shadow-lg mx-auto mt-6 w-[400px] h-[300px] bg-gradient-to-r from-amber-200 to-yellow-300 flex flex-col items-center justify-center"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <div className="bg-white rounded-full p-4 shadow-md mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold text-[#4D2C1D]">ยังไม่พบรูปหมา</p>
                  <p className="text-sm text-[#4D2C1D] mt-2">รอการถ่ายรูปจากอุปกรณ์ ESP32</p>
                </motion.div>
              )}
              
              {/* เครื่องหมายกล้องถ่ายรูปมุมขวาบน (แสดงเฉพาะเมื่อมีรูปภาพ) */}
              {latestImage && (
                <div className="absolute top-10 right-5 bg-yellow-400 rounded-full p-2 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
            </div>
            
            {imageTimestamp && (
              <div className="mt-8 bg-[#4D2C1D] bg-opacity-80 text-white px-4 py-2 rounded-xl text-center shadow-lg transform -translate-y-6">
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">ภาพล่าสุด: {imageTimestamp}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={goToFeederDetail}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl shadow-md"
            >
              🍽️ ไปยังหน้ารายละเอียดการให้อาหาร
            </button>
          </div>

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
              {remainingText}
            </div>
          </div>
          <p className="text-sm text-[#4D2C1D] mt-4 text-center">
            {error && <span className="text-red-500">{error}</span>}
          </p>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-center">
              ใน 1 อาทิตย์...
            </h2>
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
                  {`${Number(totalWeeklyFood).toFixed(1)} กรัม`}
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
                  {`${Number(leftoverWeeklyFood).toFixed(1)} กรัม`}
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
