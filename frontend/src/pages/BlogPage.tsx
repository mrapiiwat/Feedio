import React, { useState } from "react";
import { motion } from "framer-motion";

interface DogForm {
  name: string;
  breed: string;
  weight: string;
  age: string;
  disease: string;
  sex: string;
}

interface Recommendation {
  breakfast: string;
  lunch: string;
  dinner: string;
}

const BlogPage: React.FC = () => {
  const [formData, setFormData] = useState<DogForm>({
    name: "",
    breed: "",
    weight: "",
    age: "",
    disease: "",
    sex: "",
  });

  const [aiResult, setAiResult] = useState<Recommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAiResult(null);

    try {
      const response = await fetch("https://feedio.loca.lt/api/dog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const created = await response.json();
      const id = created?.dog?.Dog_ID;
      if (!id) throw new Error("ไม่พบ ID ที่ได้จาก backend");

      const res = await fetch(`https://feedio.loca.lt/api/dog/${id}`);
      const data = await res.json();
      const { dog, recommendation } = data;

      setFormData({
        name: dog.name,
        breed: dog.breed,
        weight: dog.weight.toString(),
        age: dog.age.toString(),
        disease: dog.disease,
        sex: dog.sex,
      });

      setAiResult({
        breakfast: recommendation?.Recommended_Breakfast + " กรัม",
        lunch: recommendation?.Recommended_Lunch + " กรัม",
        dinner: recommendation?.Recommended_Dinner + " กรัม",
      });
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ AI");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#FDF6E9] flex flex-col items-center px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#4D2C1D] mb-4">
        🐶 AI ผู้ช่วยคำนวณอาหารสำหรับน้องหมา
      </h1>
      {error && (
        <p className="text-red-500 text-center font-medium mb-4">{error}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFF0C7] p-6 rounded-xl w-full max-w-md shadow-md"
      >
        <label className="block mb-2 font-semibold">ชื่อ</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded border mb-4"
        />

        <label className="block mb-2 font-semibold">สายพันธุ์</label>
        <input
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          className="w-full p-2 rounded border mb-4"
        />

        <label className="block mb-2 font-semibold">น้ำหนัก (กก.)</label>
        <input
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-2 rounded border mb-4"
        />

        <label className="block mb-2 font-semibold">อายุ (ปี)</label>
        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 rounded border mb-4"
        />

        <label className="block mb-2 font-semibold">โรคประจำตัว (ถ้ามี)</label>
        <textarea
          name="disease"
          value={formData.disease}
          onChange={handleChange}
          className="w-full p-2 rounded border mb-4"
        />

        <label className="block mb-2 font-semibold">เพศ</label>
        <select
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          className="w-full p-2 rounded border mb-6"
        >
          <option value="">-- เลือกเพศ --</option>
          <option value="ผู้">ผู้</option>
          <option value="เมีย">เมีย</option>
        </select>

        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-white w-full py-2 rounded-xl font-semibold flex justify-center items-center gap-2"
        >
          📊 คำนวณปริมาณอาหารที่เหมาะสม
        </button>
      </form>

      {aiResult && (
        <div className="bg-white rounded-xl shadow-md px-6 py-4 mt-8 w-full max-w-md text-center">
          <h2 className="text-lg font-bold text-[#4D2C1D] mb-2">
            📋 ผลลัพธ์จาก AI
          </h2>
          <p>มื้อเช้า: <span className="text-red-500 font-semibold">{aiResult.breakfast}</span></p>
          <p>มื้อกลางวัน: <span className="text-red-500 font-semibold">{aiResult.lunch}</span></p>
          <p>มื้อเย็น: <span className="text-red-500 font-semibold">{aiResult.dinner}</span></p>
          <p className="text-sm text-gray-500 mt-2">* ข้อมูลโดย AI จาก backend</p>
        </div>
      )}
    </motion.div>
  );
};

export default BlogPage;
