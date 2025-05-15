import { useState, useEffect, useCallback } from "react";
import ModalMeal from "./ModalMeal";

export default () => {
  // #### Interface and Type ####
  interface IMealStatus {
    type: "morning" | "noon" | "evening";
    time: string;
    given: boolean;
    late?: boolean;
  }

  // #### State variables ####
  const [mealStatus, setMealStatus] = useState<IMealStatus[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [titleModel, setTitleModal] = useState<string>("");

  // #### Hooks ####
  useEffect(() => {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const meals: IMealStatus[] = [
      { type: "morning" as const, time: "07:00", given: false },
      { type: "noon" as const, time: "12:00", given: false },
      { type: "evening" as const, time: "18:00", given: false },
    ].map((meal) => {
      const [hour, minute] = meal.time.split(":").map(Number);
      const mealMinutes = hour * 60 + minute;
      return {
        ...meal,
        late: nowMinutes > mealMinutes,
      };
    });

    setMealStatus(meals);
  }, []);

  // #### Methods ####
  const handleOpenModal = useCallback((title: string) => {
    setTitleModal(title);
    setOpen(true);
  }, []);

  const titleTime = useCallback((type: IMealStatus["type"]) => {
    const time = {
      morning: "☀️ เช้า",
      noon: "🌤 กลางวัน",
      evening: "🌙 เย็น",
    };

    return time[type] || "❓ ไม่ทราบ";
  }, []);

  const getStatus = useCallback((given: boolean, late: boolean | undefined, title: string) => {
    const isGivenClass = given || late
      ? "inline-flex items-center rounded-md bg-green-50 px-2 py-3 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset "
      : "inline-flex items-center rounded-md bg-red-50 px-2 py-3 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset";

    const label = given
      ? "✔️ ให้แล้ว"
      : late
      ? "✔️ ให้ไปแล้ว (เลยเวลา)"
      : "⏳ ยังไม่ได้ให้";

    return (
      <div className="flex justify-between items-center gap-2">
        <button
          onClick={() => handleOpenModal(title)}
          className="block w-24 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          แก้ไข
        </button>
        <span className={`font-bold w-40 text-center ${isGivenClass}`}>{label}</span>
      </div>
    );
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-[#4D2C1D]">
        🍽 สถานะมื้ออาหารวันนี้
      </h2>

      {isOpen && <ModalMeal title={titleModel} setOpen={setOpen} />}

      <ul className="space-y-2">
        {mealStatus?.map((meal) => (
          <li key={meal.type} className="flex justify-between">
            {titleTime(meal.type)} ({meal.time})
            {getStatus(meal.given, meal.late, titleTime(meal.type))}
          </li>
        ))}
      </ul>
    </div>
  );
};
