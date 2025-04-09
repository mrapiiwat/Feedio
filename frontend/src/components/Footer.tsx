import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#4D2C1D] text-white mt-14 pt-16 pb-10 rounded-t-[200px]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-20 text-sm text-regular font-kanit text-center">
        <div>
          <h3 className="font-bold text-lg mb-3">บริการ</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">บ๊อกบ๊อก</a></li>
            <li><a href="#" className="hover:underline">สถิติการกินอาหาร</a></li>
            <li><a href="#" className="hover:underline">รายละเอียดการให้อาหาร</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">รู้จักกับเรา</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">เกี่ยวกับเรา</a></li>
            <li><a href="https://github.com" target="_blank" className="hover:underline">GitHub</a></li>
          </ul>
        </div>
        <div className="col-span-full text-center mt-10">
          <h1 className="text-[48px] font-extrabold font-kanit tracking-widest">FOODIO</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
