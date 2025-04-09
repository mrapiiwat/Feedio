//import { Helmet } from "react-helmet-async";
import React from "react";
import FidioLogoBlack from "../assets/FeedioLogoBlack.png";
import member1 from "../assets/members/member1.png";
import member2 from "../assets/members/member2.png";
import member3 from "../assets/members/member3.png";
import member4 from "../assets/members/member4.png";
import member5 from "../assets/members/member5.png";

const AboutPage: React.FC = () => {
  const team = [
    {
      name: "นายธัญญเทพ ปาลกะวงศ์ ณ อยุธยา",
      id: "630407030037",
      img: member1,
    },
    {
      name: "นายอภิวัฒน์ ลานทอง",
      id: "651110977",
      img: member2,
    },
    {
      name: "นายภูมิพัฒน์ เวฬุฬฐ์วรรณราช",
      id: "65111552",
      img: member3,
    },
    {
      name: "นางสาวปิยธิดา อันชม",
      id: "65112193",
      img: member4,
    },
    {
      name: "นางสาวสุขหทัย พลยะเรศ",
      id: "65112429",
      img: member5,
    },
  ];

  return (
    <div className="px-4 py-12 max-w-5xl mx-auto text-center text-[#4D2C1D]">
      {/* โลโก้ Feedio */}
      <img
            src={FidioLogoBlack}
            alt="FeedioLogoBlack"
            className="rounded-xl mx-auto mt-10 "
            style={{ width: "400px", height: "150px" }} // กำหนดขนาดของรูปภาพ
          />

      {/* คำอธิบาย */}
      <p className="text-lg leading-relaxed mb-2">
        Feedio เครื่องให้อาหารสุนัขอัตโนมัติ ที่จะช่วยให้น้องหมาสามารถดูได้ว่าสุนัขของเรากินข้าวหรือยัง
        หรือต้องการอาหารเพิ่มเติมหรือไม่ โดย Feedio
      </p>
      <p className="text-lg leading-relaxed mb-8">
        เป็นส่วนหนึ่งของโครงงานรายวิชา CE395 ปฏิบัติการทางวิศวกรรมคอมพิวเตอร์
      </p>

      <p className=" mb-12 font-semibold text-center">คณะผู้จัดทำ</p>

      {/* สมาชิกทีม */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
        {team.map((member, index) => (
          <div key={index} className="text-center">
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 object-cover rounded-full shadow-md mx-auto"
            />
            <p className="font-semibold mt-4">{member.id}</p>
            <p className="text-sm">{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
