//import { Helmet } from "react-helmet-async";
import React from "react";
import Milo1 from "../assets/Milo1.png";
import meal1 from "../assets/meal-1.png";
import meal2 from "../assets/meal-2.png";
import meal3 from "../assets/meal-3.png";

const FeederDetailPage: React.FC = () => {
  const meals = [
    { label: "เช้า", img: meal1 },
    { label: "กลางวัน", img: meal2 },
    { label: "เย็น", img: meal3 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-[#4D2C1D]">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* รูปน้องหมา */}
        <div className="text-center">
          <img
            src={Milo1}
            alt="Milo"
            className="w-64 h-64 object-cover rounded-full mx-auto shadow-md"
          />
          <p className="mt-4 text-sm">ภาพถูกถ่าย ณ เวลา xx:xx น.</p>
        </div>

        {/* ฝั่งขวา */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">สถานะการให้อาหาร</h2>

          {/* อาหาร 3 มื้อ */}
          <div className="flex justify-center gap-8">
            {meals.map((meal, index) => (
              <div key={index} className="text-center">
                <img
                  src={meal.img}
                  alt={meal.label}
                  className="w-16 h-16 mx-auto rounded-full"
                />
                <p className="mt-2">{meal.label}</p>
              </div>
            ))}
          </div>

          {/* ให้อาหารเพิ่ม */}
          <h3 className="text-xl font-bold text-center">อยากให้อาหารเพิ่มไหม?</h3>

          <div className="text-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-xl shadow-md">
              🍲 ให้อาหารเพิ่ม XX กรัม
            </button>
          </div>

          <p className="text-center text-sm text-gray-700">
            ให้อาหารเพิ่มไปแล้ว x ครั้ง รวม xx กรัม
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeederDetailPage;
