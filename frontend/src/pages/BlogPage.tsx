import { Helmet } from "react-helmet-async";

const BlogPage = () => {
    return (
        <>
            <Helmet>
                <title>Feedio | บ๊อกบ๊อก AI ผู้ช่วยคำนวน </title>
            </Helmet>

            <div className="flex flex-col items-center justify-center h-screen bg-[#F9F3E3]">
                <h1 className="text-4xl font-bold text-[#4D2C1D] mb-4">บ๊อกบ๊อก AI ผู้ช่วยคำนวนปริมาณอาหาร</h1>
                <p className="text-lg text-center max-w-2xl text-[#4D2C1D]">
                    บ๊อกบ๊อก เป็นหน้าสำหรับการคำนวนปริมาณอาหารของน้องหมาที่ควรได้รับ โดยจะมีการแสดงผลการคำนวนอาหารที่น้องหมากินในแต่ละวัน โดยที่ผู้ใช้จะต้องใส่ข้อมูลของน้องหมาเช่น สายพัน น้ำหนัก อายุ
                    เพื่อให้ AI คำนวนอาหารที่น้องหมาต้องการในแต่ละวันได้อย่างถูกต้อง
                </p>
            </div>
        </>
    );
}
export default BlogPage;