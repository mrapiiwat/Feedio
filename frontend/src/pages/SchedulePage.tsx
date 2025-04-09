// SchedulePage.tsx
import { Helmet } from "react-helmet-async";
const SchedulePage = () => {
    return (
        <>
            <Helmet>
                <title>Feedio | ตารางการให้อาหาร</title>
            </Helmet>

            <div className="flex flex-col items-center justify-center h-screen bg-[#F9F3E3]">
                <h1 className="text-4xl font-bold text-[#4D2C1D] mb-4">ตารางการให้อาหาร</h1>
                <p className="text-lg text-center max-w-2xl text-[#4D2C1D]">
                    ตารางการให้อาหารช่วยให้คุณสามารถติดตามและจัดการการให้อาหารสัตว์เลี้ยงของคุณได้อย่างมีประสิทธิภาพ
                    คุณสามารถตั้งเวลาและบันทึกข้อมูลการให้อาหารได้อย่างง่ายดาย
                </p>
            </div>
        </>
    );
}
export default SchedulePage;
  