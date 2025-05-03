import { useState, useEffect, useCallback } from "react";
import ModalMeal from "./ModalMeal";

export default () => {
  // #### Interface and Type ####
  interface IMealStatus {
    type: "morning" | "noon" | "evening";
    time: string;
    given: boolean;
  }

  // #### State variables ####
  const [mealStatus, setMealStatus] = useState<IMealStatus[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [titleModel, setTitleModal] = useState<string>('');

  // #### Hooks ####
  useEffect(() => {
    setMealStatus([
      { type: "morning", time: "07:00", given: false },
      { type: "noon", time: "12:00", given: false },
      { type: "evening", time: "18:00", given: false },
    ]);
  }, []);

  // #### Methods ####
  const handleOpenModal = useCallback((title: string) => {
    setTitleModal(title);
    setOpen(!isOpen);
  }, []);

  const titleTime = useCallback((type: IMealStatus["type"]) => {
    const time = {
      morning: "☀️ เช้า",
      noon: "🌤 กลางวัน",
      evening: "🌙 เย็น",
    };

    return time[type] || "❓ ไม่ทราบ";
  }, []);

  const getStatus = useCallback((given: boolean, title: string) => {
      const isGiven = given ? "inline-flex items-center rounded-md bg-green-50 px-2 py-3 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset" : "inline-flex items-center rounded-md bg-red-50 px-2 py-3 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset";
      return (
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={() => handleOpenModal(title)}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            แก้ไข
          </button>
          <span className={`font-bold ${isGiven}`}>
            {given ? "✔️ ให้แล้ว" : "⏳ ยังไม่ได้ให้"}
          </span>
        </div>
      );
    }, [isOpen, setOpen]);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-[#4D2C1D]">
        🍽 สถานะมื้ออาหารวันนี้
      </h2>

      {isOpen && <ModalMeal title={titleModel} setOpen={setOpen} />}

      <ul className="space-y-2">
        {mealStatus?.map((meal) => (
          <li key={meal.type} className="flex justify-between">
            {titleTime(meal.type)} ({meal.time}){getStatus(meal.given, titleTime(meal.type))}
          </li>
        ))}
      </ul>
    </div>
  );
};
