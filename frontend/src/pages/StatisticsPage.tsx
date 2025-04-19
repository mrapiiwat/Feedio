import React, { useEffect, useState } from "react";

const StatisticsPage: React.FC = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedWeek, setSelectedWeek] = useState<number>(getWeekOfMonth(new Date()));
  const [totalGiven, setTotalGiven] = useState<number>(0);
  const [totalRemaining, setTotalRemaining] = useState<number>(0);
  const [dailyStats, setDailyStats] = useState<Record<string, { given: number; left: number }>>({});

  useEffect(() => {
    fetch("https://feedio.loca.lt/api/history")
      .then((res) => res.json())
      .then((data) => setHistoryData(data))
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  useEffect(() => {
    const filtered = historyData.filter((item) => {
      const date = new Date(item.date);
      const isSameYear = date.getFullYear() === selectedYear;
      const isSameMonth = date.getMonth() + 1 === selectedMonth;
      const isSameWeek = getWeekOfMonth(date) === selectedWeek;
      return isSameYear && isSameMonth && isSameWeek;
    });

    const totalGivenAmount = filtered.reduce((sum, item) => sum + (item.given_amount || 0), 0);
    const totalRemainingAmount = filtered.reduce((sum, item) => sum + (item.remaining_amount || 0), 0);

    setTotalGiven(totalGivenAmount);
    setTotalRemaining(totalRemainingAmount);

    // 👇 สร้างข้อมูลรายวัน
    const grouped: Record<string, { given: number; left: number }> = {};
    filtered.forEach((item) => {
      const dateKey = new Date(item.date).toLocaleDateString("th-TH", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });

      if (!grouped[dateKey]) {
        grouped[dateKey] = { given: 0, left: 0 };
      }
      grouped[dateKey].given += item.given_amount || 0;
      grouped[dateKey].left += item.remaining_amount || 0;
    });

    setDailyStats(grouped);
  }, [historyData, selectedYear, selectedMonth, selectedWeek]);

  return (
    <div className="min-h-screen bg-[#FFF9F0] px-6 py-8">
      <h1 className="text-3xl font-bold text-center text-[#4D2C1D] mb-6">📊 สถิติการให้อาหาร</h1>

      {/* Dropdown filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="p-2 border rounded">
          {Array.from({ length: 5 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return <option key={year} value={year}>ปี {year}</option>;
          })}
        </select>

        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} className="p-2 border rounded">
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>เดือน {i + 1}</option>
          ))}
        </select>

        <select value={selectedWeek} onChange={(e) => setSelectedWeek(Number(e.target.value))} className="p-2 border rounded">
          {[1, 2, 3, 4, 5].map((w) => (
            <option key={w} value={w}>สัปดาห์ที่ {w}</option>
          ))}
        </select>
      </div>

      {/* Summary */}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 text-center space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-[#4D2C1D]">🍽 ปริมาณที่ให้อาหาร</h2>
          <p className="text-3xl text-[#E94F1D] font-bold">{totalGiven.toFixed(1)} กรัม</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#4D2C1D]">🥣 ปริมาณที่เหลือ</h2>
          <p className="text-3xl text-[#E94F1D] font-bold">{totalRemaining.toFixed(1)} กรัม</p>
        </div>
      </div>

      {/* ตารางรายวัน */}
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4 text-center text-[#4D2C1D]">
          รายละเอียดรายวันในสัปดาห์ที่ {selectedWeek}
        </h2>

        {Object.keys(dailyStats).length > 0 ? (
          <table className="w-full bg-white rounded-xl shadow-md">
            <thead className="bg-[#F9F3E3] text-[#4D2C1D]">
              <tr>
                <th className="py-2 px-4 text-left">📅 วันที่</th>
                <th className="py-2 px-4 text-right">🍽 ให้ไปแล้ว (g)</th>
                <th className="py-2 px-4 text-right">🥣 เหลือ (g)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(dailyStats).map(([date, stat]) => (
                <tr key={date} className="border-b">
                  <td className="py-2 px-4">{date}</td>
                  <td className="py-2 px-4 text-right text-green-700 font-semibold">
                    {stat.given.toFixed(1)}
                  </td>
                  <td className="py-2 px-4 text-right text-orange-700 font-semibold">
                    {stat.left.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">ยังไม่มีข้อมูลในสัปดาห์นี้</p>
        )}
      </div>
    </div>
  );
};

// 🔹 Helper function: คำนวณว่าสัปดาห์ที่เท่าไหร่ในเดือน
function getWeekOfMonth(date: Date): number {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0=Sun
  return Math.ceil((date.getDate() + firstDay) / 7);
}

export default StatisticsPage;
