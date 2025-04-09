import React from "react";
import FidioLogo from "../assets/FeedioLogo.png";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#4D2C1D] text-white mt-14 pt-16 pb-10 rounded-t-[200px]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-20 text-sm text-regular font-kanit text-center">
        <div>
          <h3 className="font-bold text-lg mb-3">บริการ</h3>
          <ul className="space-y-1">
            <li><Link to="/blog">บ๊อกบ๊อก</Link></li>
            <li><Link to="/statistics">สถิติการกินอาหาร</Link></li>
            <li><Link to="/feederdetail">รายละเอียดการให้อาหาร</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">รู้จักกับเรา</h3>
          <ul className="space-y-1">
            <li><Link to="/about">เกี่ยวกับเรา</Link></li>
            <li><a href="https://github.com" target="_blank" className="hover:underline">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center my-1">
          <img
            src={FidioLogo}
            alt="FeedioLogo"
            className="rounded-xl mx-auto mt-10 "
            style={{ width: "400px", height: "150px" }} // กำหนดขนาดของรูปภาพ
          />
        </div>
    </footer>
  );
};

export default Footer;
