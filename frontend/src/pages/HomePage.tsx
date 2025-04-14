import React from "react";
//import Navbar from "../components/Navbar";
//import Footer from "../components/Footer";
import dogImage from "../assets/dog.png";
import TotolFoodImage from "../assets/อาหารทั้งหมด.png";
import RemainingFoodImage from "../assets/อาหารเหลือ.png";
import IconFood from "../assets/iconfood.png";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
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
          {/* ส่วนที่ 1: ข้อความหัว */}
          <h1 className="text-3xl font-bold text-center text-brown-800 font-kanit">
            ให้ Feedio ดูแลน้องหมาของคุณ 🐶
          </h1>
        </motion.div>

        {/* ส่วนที่ 2: รูปภาพน้องหมา */}
        <div className="flex justify-center my-4">
          <motion.img
            src={dogImage}
            alt="น้องหมาน่ารัก"
            className="rounded-xl shadow-lg mx-auto mt-6"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ width: "400px", height: "300px" }} // กำหนดขนาดของรูปภาพ
          />
        </div>

        {/* ส่วนที่ 3: ปุ่มให้อาหาร */}
        <div className="flex justify-center">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl shadow-md">
            🍲 กดเพื่อให้อาหารสัตว์ของคุณ
          </button>
        </div>

        {/* ส่วนที่ 4: แสดงอาหารที่เหลือ */}
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
          <div className="text-5xl font-bold text-[#E94F1D]">000.0 กรัม</div>
        </div>
        <p className="text-sm text-[#4D2C1D] mt-4 text-center">
          ปริมาณอาหารคงเหลือ ณ เวลา xx.xx น.
        </p>

        {/* ส่วนที่ 5: สรุปสัปดาห์ */}
        <div className="mt-10 ">
          <h2 className="text-xl font-semibold text-center">ใน 1 อาทิตย์...</h2>
          <div className="flex justify-center gap-8 mt-4">
            <div>
              <img
                src={TotolFoodImage}
                alt="อาหารทั้งหมด"
                className="rounded-xl mx-auto mt-6"
                style={{ width: "300px", height: "250px" }} // กำหนดขนาดของรูปภาพถ้วยอาหารทั้งหมด
              />
              <p className="text-center mt-2 text-[#E94F1D]">
                กินไปทั้งหมด
                <br />
                00.0 กรัม
              </p>
            </div>
            <div>
              <img
                src={RemainingFoodImage}
                alt="อาหารเหลือ"
                className="rounded-xl mx-auto mt-6"
                style={{ width: "300px", height: "250px" }} // กำหนดขนาดของรูปภาพถ้วยอาหารคงเหลือ
              />
              <p className="text-center mt-2 text-[#E94F1D]">
                กินเหลือ
                <br />
                00.0 กรัม
              </p>
            </div>
          </div>
          <div className="bg-cream pt-6 pb-10"></div>
        </div>
      </main>
    </div>
    </motion.div>
  );
};

export default HomePage;
