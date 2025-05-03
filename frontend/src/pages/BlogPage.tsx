import React, { useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../utils/api";
import axios from "axios";

interface FormData {
  name: string;
  breed: string;
  weight: number;
  age: number;
  disease: string;
  sex: string;
}

const BlogPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    breed: "",
    weight: 0,
    age: 0,
    disease: "",
    sex: "",
  });

  const [aiResult, setAiResult] = useState<{
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  } | null>(null);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setAiResult(null);
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/dog`, {
        name: formData.name,
        breed: formData.breed,
        weight: Number(formData.weight),
        disease: formData.disease,
        age: Number(formData.age),
        sex: formData.sex,
      });

      const dogId = res.data.dog.Dog_ID;
      localStorage.setItem("dogId", dogId);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      const ai = await axios.get(`${API_BASE_URL}/recom/dog/${dogId}`);

      if (!ai.data.recommendation || ai.data.recommendation.length === 0) {
        throw new Error("AI ไม่สามารถให้คำแนะนำได้ในขณะนี้");
      }

      setAiResult({
        breakfast: ai.data.recommendation[0].Recommended_Breakfast,
        lunch: ai.data.recommendation[0].Recommended_Lunch,
        dinner: ai.data.recommendation[0].Recommended_Dinner,
      });
    } catch (err: any) {
      console.log(err);
      setError(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#fff8ed] px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-xl mx-auto bg-[#fff0c2] p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-brown-800">
          🤖 AI ผู้ช่วยคำนวณอาหารสำหรับน้องหมา
        </h1>

        {error && (
          <p className="text-red-500 text-center font-medium mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>ชื่อ</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border"
              placeholder="ชื่อ"
            />
          </div>

          <div>
            <label>สายพันธุ์</label>
            <input
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border"
              placeholder="เช่น ปั๊ก, โกลเด้น"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>เพศ</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
                className="w-full p-2 rounded border"
              >
                <option value="">-- เลือกเพศ --</option>
                <option value="Male">ผู้</option>
                <option value="Female">เมีย</option>
              </select>
            </div>

            <div>
              <label>อายุ (ปี)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-2 rounded border"
                placeholder="อายุ"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>น้ำหนัก (กก.)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                className="w-full p-2 rounded border"
                placeholder="น้ำหนัก"
              />
            </div>

            <div>
              <label>โรคประจำตัว (ถ้ามี)</label>
              <input
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                placeholder="ไม่มี / หรือระบุโรค"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-full w-full font-semibold mt-4"
          >
            📊 คำนวณปริมาณอาหารที่เหมาะสม
          </button>
        </form>

        {isLoading && (
          <div className="text-center mt-4 text-yellow-600 font-medium animate-pulse">
            🔄 กำลังประมวลผลโดย AI... กรุณารอสักครู่
          </div>
        )}

        {aiResult && (
          <div className="bg-white rounded-lg shadow-md p-4 mt-6 text-center">
            <h2 className="text-lg font-semibold text-brown-700 mb-2">
              🍽️ ผลลัพธ์จาก AI
            </h2>
            <p className="text-brown-800">
              มื้อเช้า: {aiResult.breakfast} กรัม
            </p>
            <p className="text-brown-800">มื้อกลางวัน: {aiResult.lunch} กรัม</p>
            <p className="text-brown-800">มื้อเย็น: {aiResult.dinner} กรัม</p>
            <p className="text-xs text-gray-500 mt-2">
              * ข้อมูลโดย AI จาก backend
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogPage;
