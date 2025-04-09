import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="bg-[#4D2C1D] h-40 flex items-center justify-center rounded-b-full shadow-md">
      <nav className="bg-[#F9F3E3] rounded-full mx-auto max-w-6xl mt-0 mb-[-20px] px-6 py-3 shadow-md flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-[#4D2C1D]">Feedio</div>

        {/* เมนู */}
        <ul className="flex space-x-6 text-[#4D2C1D] font-medium">
          <li><a href="#">รายละเอียดการให้อาหาร</a></li>
          <li><a href="#">สถิติการกินอาหาร</a></li>
          <li><a href="#">เกี่ยวกับเรา</a></li>
          <li><a href="#">บ็อกบ็อก</a></li>
        </ul>

        {/* ปุ่ม login */}
        <button className="bg-[#4D2C1D] text-white px-5 py-1.5 rounded-full font-semibold">
          เข้าสู่ระบบ
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
