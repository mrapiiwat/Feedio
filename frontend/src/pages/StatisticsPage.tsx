import React, { useState } from "react";
import { motion } from "framer-motion";

const StatisticsPage: React.FC = () => {
  const [week, setWeek] = useState("ทั้งหมด");
  const [month, setMonth] = useState("มกราคม");
  const [year, setYear] = useState("2568");

  const dummyData = [
    {
      week: "1",
      month: "มกราคม",
      year: "2568",
      range: "1 ม.ค. 2568 - 7 ม.ค. 2568"
    },
    {
      week: "2",
      month: "มกราคม",
      year: "2568",
      range: "8 ม.ค. 2568 - 14 ม.ค. 2568"
    },
    {
      week: "3",
      month: "มกราคม",
      year: "2568",
      range: "15 ม.ค. 2568 - 21 ม.ค. 2568"
    },
    {
      week: "4",
      month: "มกราคม",
      year: "2568",
      range: "22 ม.ค. 2568 - 31 ม.ค. 2568"
    }
  ];

  const filteredData = dummyData.filter((item) => {
    return (
      (week === "ทั้งหมด" || item.week === week[0]) && // week[0] = "1" จาก "1 (วันที่ 1 - 7)"
      item.month === month &&
      item.year === year
    );
  });

  return (

    <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="px-4 py-8"
        >
          
    <div className="p-6">
      {/* Dropdown filter */}
      <div className="flex justify-center gap-4 mb-6">
        <select
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="ทั้งหมด">ทั้งหมด</option>
          <option value="1 (วันที่ 1 - 7)">1 (วันที่ 1 - 7)</option>
          <option value="2 (วันที่ 8 - 14)">2 (วันที่ 8 - 14)</option>
          <option value="3 (วันที่ 15 - 21)">3 (วันที่ 15 - 21)</option>
          <option value="4 (วันที่ 22 - 31)">4 (วันที่ 22 - 31)</option>
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border rounded"
        >
          {[
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
          ].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="2567">2567</option>
          <option value="2568">2568</option>
          <option value="2569">2569</option>
        </select>
      </div>

      {/* Table */}
      <table className="mx-auto w-[80%] text-center bg-[#ded1c6] rounded">
        <thead>
          <tr>
            <th className="p-4">อาทิตย์ที่</th>
            <th className="p-4">ระหว่างวันที่</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="bg-[#d8cabe]">
              <td className="p-4">{item.week}</td>
              <td className="p-4">{item.range}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </motion.div>
  );
};

export default StatisticsPage;
