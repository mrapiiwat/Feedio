import { Helmet } from "react-helmet-async";

const BlogPage = () => {
    return (
        <>
            <Helmet>
                <title>Feedio | บล็อก</title>
            </Helmet>

            <div className="flex flex-col items-center justify-center h-screen bg-[#F9F3E3]">
                <h1 className="text-4xl font-bold text-[#4D2C1D] mb-4">บล็อก</h1>
                <p className="text-lg text-center max-w-2xl text-[#4D2C1D]">
                    บล็อก Feedio เป็นแหล่งข้อมูลที่ให้ความรู้และเคล็ดลับในการดูแลสัตว์เลี้ยงของคุณ
                    เรามีบทความที่น่าสนใจเกี่ยวกับการให้อาหาร การดูแลสุขภาพ และการเลี้ยงสัตว์เลี้ยง
                </p>
            </div>
        </>
    );
}
export default BlogPage;