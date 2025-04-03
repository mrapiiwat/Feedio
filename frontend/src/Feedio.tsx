import React from "react";

const Foodio: React.FC = () => {
  return (
    <div className="bg-[#4E342E] text-gray-900 min-h-screen">
      <header className="bg-[#3E2723] p-6 text-white text-center text-2xl font-bold">
        ให้ <span>Feedio</span> ดูแลน้องหมาของคุณ
        <div className="mt-2 text-3xl">🐾🐾</div>
      </header>

      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <div className="w-60 h-60 mx-auto border-2 border-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">อัพโหลดรูปสุนัข</span>
          </div>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
            อัพโหลดภาพสุนัขของคุณ
          </button>

          <div className="mt-6 bg-gray-200 p-4 rounded-lg">
            <div className="text-gray-600">ปรับปริมาณอาหารตามสัดส่วน</div>
            <div className="mt-2 text-red-600 font-bold text-2xl">000.0 กรัม</div>
          </div>

          <div className="mt-6 text-gray-700 text-lg font-bold">ใน 1 อาทิตย์...</div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="text-center">
              <div className="w-32 h-32 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">รูปอาหารเม็ด</span>
              </div>
              <p className="mt-2 text-red-600 font-bold">000.0 กรัม</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">รูปข้าว</span>
              </div>
              <p className="mt-2 text-red-600 font-bold">000.0 กรัม</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#3E2723] text-white text-center p-8 mt-8 relative">
        <div className="absolute top-0 left-0 w-full h-16 bg-[#4E342E] rounded-b-full"></div>
        <div className="relative z-10 flex justify-around items-center">
          <div>
            <h3 className="font-bold">บริการ</h3>
            <button className="block text-white mt-2">บอกบ๊อก</button>
            <button className="block text-white mt-2">สถิติการกินอาหาร</button>
            <button className="block text-white mt-2">รายละเอียดการให้อาหาร</button>
          </div>
          <div>
            <h3 className="font-bold">รู้จักกับเรา</h3>
            <button className="block text-white mt-2">เกี่ยวกับเรา</button>
            <button className="block text-white mt-2">GitHub</button>
          </div>
        </div>
        <div className="mt-8 text-center text-4xl font-bold">FOODIO</div>
      </footer>
    </div>
  );
};

export default Foodio;
