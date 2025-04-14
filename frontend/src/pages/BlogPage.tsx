import React, { useState } from "react";
import { motion } from "framer-motion";

const BlogPage: React.FC = () => {
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [activity, setActivity] = useState("");
  const [disease, setDisease] = useState("");
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    // MOCK Result: สมมุติว่า fetch จาก backend แล้ว
    const summary = `🐾 สายพันธุ์: ${breed} เพศ: ${gender}
น้ำหนัก ${weight} กก. อายุ ${age} ปี
ระดับกิจกรรม: ${activity}
🔍 AI แนะนำให้กินอาหาร ~ 220 กรัม/วัน แบ่งเป็น 2 มื้อ`;
    setResult(summary);
  };

  return (
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="px-4 py-8"
    >
      <div className="max-w-3xl mx-auto px-6 py-10 text-[#4D2C1D] font-kanit">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6">
          🐶 Feedio AI คำนวณอาหารน้องหมา
        </h1>
        <p className="text-center mb-8 text-gray-700">
          กรอกข้อมูลของน้องหมา แล้วให้ AI คำนวณปริมาณอาหารที่เหมาะสมในแต่ละวัน
        </p>

        {/* Form */}
        <div className="space-y-4 bg-[#F9F3E3] p-6 rounded-xl shadow">
          <div>
            <label className="block font-medium">สายพันธุ์</label>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              placeholder="เช่น ชิวาวา, โกลเด้น"
              className="w-full mt-1 p-2 rounded border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">เพศ</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 rounded border"
              >
                <option value="">-- เลือกเพศ --</option>
                <option value="เพศผู้">เพศผู้</option>
                <option value="เพศเมีย">เพศเมีย</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">อายุ (ปี)</label>
              <input
                type="number"
                min="0"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 rounded border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">น้ำหนัก (กก.)</label>
              <input
                type="number"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 rounded border"
              />
            </div>

            <div>
              <label className="block font-medium">ระดับกิจกรรม</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full p-2 rounded border"
              >
                <option value="">-- เลือกระดับ --</option>
                <option value="ต่ำ">ต่ำ</option>
                <option value="ปานกลาง">ปานกลาง</option>
                <option value="สูง">สูง</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium">โรคประจำตัว (ถ้ามี)</label>
            <textarea
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              rows={2}
              placeholder="ไม่มี / หรือพิมพ์เพิ่ม"
              className="w-full p-2 rounded border"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-xl"
          >
            📊 คำนวณปริมาณอาหารที่เหมาะสม
          </button>
        </div>

        {/* AI Result */}
        {result && (
          <div className="mt-8 p-4 bg-[#ded1c6] rounded-xl shadow-inner">
            <h2 className="text-xl font-bold mb-2">🧠 ผลลัพธ์จาก AI</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-800">
              {result}
            </pre>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogPage;
