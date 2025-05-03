import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";
import dayjs from 'dayjs'
import 'dayjs/locale/th'

const StatisticsPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [historyData, _setHistoryData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (startDate && endDate) {
        const start = dayjs(startDate.toLocaleDateString()).format('YYYY/MM/DD')
        const end = dayjs(endDate.toLocaleDateString()).format('YYYY/MM/DD')
        const query = new URLSearchParams();
        query.append('start', start)
        query.append('end', end)
        await getAllHistory (query.toString());
      } else {
        setFilteredData([]);
      }
    }

    fetchData();
  }, [startDate, endDate, historyData]);


  const getAllHistory = async (query?: string) => {
    try {
      const filter = query ? `?${query}`: '';
      const responses = await axios.get(`${API_BASE_URL}/history${filter}`)

      setFilteredData(responses.data.history ?? []);
    } catch (error) {
      alert('เกิดข้อผิดพลาดกรุณาลองอีกครั้ง')
    }
  }

  const totalEaten = filteredData
    .reduce((sum: number, item: any) => sum + (item.Given_Amount || 0), 0);

  const totalLeft = filteredData
    .reduce((sum: number, item: any) => sum + (item.Remaining_Amount || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F9F3E3] p-6"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* 📅 Date Picker */}
        <h1 className="text-2xl font-bold text-center mb-6 text-[#4D2C1D]">
          📅 เลือกช่วงวันที่
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <DatePicker
            selected={startDate || undefined}
            onChange={(date) => setStartDate(date)}
            startDate={startDate || undefined}
            endDate={endDate || undefined}
            dateFormat="dd/MM/yyyy"
            placeholderText="เลือกวันที่เริ่มต้น"
            className="border rounded-lg p-2 text-center"
          />

          <span className="mx-2">ถึง</span>

          <DatePicker
            selected={endDate || undefined}
            onChange={(date) => setEndDate(date)}
            startDate={startDate || undefined}
            endDate={endDate || undefined}
            minDate={startDate || undefined}
            dateFormat="dd/MM/yyyy"
            placeholderText="เลือกวันที่สิ้นสุด"
            className="border rounded-lg p-2 text-center"
          />
        </div>

        {/* 🥘 Summary */}
        {startDate && endDate && (
          <div className="bg-[#FFF5E4] p-6 rounded-lg mb-8 text-center shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#4D2C1D]">
              🥘 สรุปผลรวม (ช่วงวันที่เลือก)
            </h2>
            <div className="text-lg text-[#4D2C1D] mb-2">
              🍚 ปริมาณที่ให้อาหารทั้งหมด:{" "}
              <span className="text-[#E94F1D] font-bold">
                {totalEaten.toFixed(1)} กรัม
              </span>
            </div>
            <div className="text-lg text-[#4D2C1D]">
              🥣 ปริมาณอาหารที่เหลือทั้งหมด:{" "}
              <span className="text-[#E94F1D] font-bold">
                {totalLeft.toFixed(1)} กรัม
              </span>
            </div>
          </div>
        )}

        {/* 📅 Daily Table */}
        {startDate && endDate && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead className="bg-[#FFD580] text-[#4D2C1D]">
                <tr>
                  <th className="py-3 px-4 border-b">📅 วันที่</th>
                  <th className="py-3 px-4 border-b">🍚 ให้อาหาร (g)</th>
                  <th className="py-3 px-4 border-b">🥣 เหลือ (g)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item: any, index: number) => (
                    <tr key={index} className="text-center">
                      <td className="py-3 px-4 border-b">
                        {dayjs(item.Date).locale('th').format('dddd D MMM')}
                      </td>
                      <td className="py-3 px-4 border-b text-[#E94F1D]">
                        {`${item.Given_Amount.toFixed(1)} กรัม`}
                      </td>
                      <td className="py-3 px-4 border-b text-[#E94F1D]">
                        {`${item.Remaining_Amount.toFixed(1)} กรัม`}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-[#4D2C1D]">
                      ไม่มีข้อมูลในช่วงวันที่เลือก
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatisticsPage;
