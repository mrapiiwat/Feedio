import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Notification from "./Notification";

const Navbar: React.FC = () => {
  return (
    <div className="bg-[#4D2C1D] h-40 flex items-center justify-center rounded-b-full shadow-md">
      <nav className="bg-[#F9F3E3] rounded-full mx-auto max-w-6xl mt-0 mb-[-20px] px-8 py-3 shadow-md flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ rotate: 15 }}
          whileTap={{ rotate: -15 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <NavLink
            to="/"
            className="text-2xl font-bold text-[#4D2C1D] hover:scale-105 transition-transform duration-300 px-2"
          >
            🐶 Feedio
          </NavLink>
        </motion.div>

        {/* เมนู */}
        <ul className="flex space-x-4 items-center text-lg">
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#FFE5B4] text-[#E94F1D] font-bold py-2 px-2 rounded-full transition-all duration-300"
                  : "hover:bg-[#FFE5B4] hover:text-[#E94F1D] py-2 px-2 rounded-full transition-all duration-300"
              }
            >
              🤖บ๊อกบ๊อก AI ผู้ช่วย
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feederdetail"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#FFE5B4] text-[#E94F1D] font-bold py-2 px-2 rounded-full transition-all duration-300"
                  : "hover:bg-[#FFE5B4] hover:text-[#E94F1D] py-2 px-2 rounded-full transition-all duration-300"
              }
            >
              🍽️รายละเอียดการให้อาหาร
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/statistics"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#FFE5B4] text-[#E94F1D] font-bold py-2 px-2 rounded-full transition-all duration-300"
                  : "hover:bg-[#FFE5B4] hover:text-[#E94F1D] py-2 px-2 rounded-full transition-all duration-300"
              }
            >
              📅สถิติการกินอาหาร
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#FFE5B4] text-[#E94F1D] font-bold py-2 px-2 rounded-full transition-all duration-300"
                  : "hover:bg-[#FFE5B4] hover:text-[#E94F1D] py-2 px-2 rounded-full transition-all duration-300"
              }
            >
              🏠เกี่ยวกับเรา
            </NavLink>
          </li>

          {/* 🔔 Notification */}
       
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
