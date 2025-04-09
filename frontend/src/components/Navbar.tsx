import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="bg-[#4D2C1D] h-40 flex items-center justify-center rounded-b-full shadow-md">
      <nav className="bg-[#F9F3E3] rounded-full mx-auto max-w-6xl mt-0 mb-[-20px] px-6 py-3 shadow-md flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-[#4D2C1D] mr-4">
          Feedio
        </NavLink>

        {/* เมนู */}
        <ul className="flex space-x-6">
          <li>
            <NavLink to="/feederdetail"className={({ isActive }) =>isActive? "text-[#E94F1D] font-bold underline": "hover:underline"
              }
            >
              รายละเอียดการให้อาหาร
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/statistics"
              className={({ isActive }) =>
                isActive
                  ? "text-[#E94F1D] font-bold underline"
                  : "hover:underline"
              }
            >
              สถิติการกินอาหาร
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-[#E94F1D] font-bold underline"
                  : "hover:underline"
              }
            >
              เกี่ยวกับเรา
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "text-[#E94F1D] font-bold underline"
                  : "hover:underline mr-4"
              }
            >
              บ๊อกบ๊อก
            </NavLink>
          </li>
        </ul>

        {/* ปุ่ม Login */}
        <button className="bg-[#4D2C1D] text-white px-3 py-1.5 rounded-full font-semibold">
          เข้าสู่ระบบ
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
