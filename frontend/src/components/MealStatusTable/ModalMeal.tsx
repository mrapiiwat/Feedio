import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";

interface IProps {
  title: string;
  setOpen: (isOpen: boolean) => void;
}

export default function FeederModal(props: IProps) {
  interface IFeeder {
    Feeder_ID: string;
    Food_Capacity: number;
    Current_Food: number;
    Status: boolean;
  }

  interface IFeederSchedule {
    Schedule_ID: string;
    Feeder_ID: string;
    Dog_ID: number;
    Food_Amount: string;
    Day_Type: string;
  }

  const [feedAmount, setFeedAmount] = useState<number>(50);

  // #### Methods ####
  const getAllFeeder = async (): Promise<IFeeder[]> => {
    try {
      let data = (await axios.get(`${API_BASE_URL}/feeder`)).data.feeders || [];
      if (data.length === 0) {
        await createFeeder();
        data = (await axios.get(`${API_BASE_URL}/feeder`)).data.feeders || [];
      }
      return data;
    } catch (error) {
      return [];
    }
  };

  const getAllFeederSchedule = async (): Promise<IFeederSchedule[]> => {
    try {
      let data =
        (await axios.get(`${API_BASE_URL}/schedules`)).data.schedules || [];
      if (data.length < 3) {
        const feeders = await getAllFeeder();
        await createFeederSchedule(feeders?.[0].Feeder_ID);
        data =
          (await axios.get(`${API_BASE_URL}/schedules`)).data.schedules || [];
      }
      return data;
    } catch (error) {
      return [];
    }
  };

  const createFeeder = async () => {
    try {
      await axios.post(`${API_BASE_URL}/feeder`, {
        food_capa: 500,
        current_food: 0,
      });
    } catch (error) {
      alert("ไม่สามารถบันทึกข้อมูลฟีดเดอร์ได้");
    }
  };

  const createFeederSchedule = async (feederID: string) => {
    try {
      const dogId = localStorage.getItem("dogId");
      if (!feederID || !dogId) return;

      await Promise.all(
        ['morning', 'noon', 'evening'].map(async (dayType, index) =>{
          const {data} = await axios.post(`${API_BASE_URL}/schedules`, {
            feederID: feederID,
            dogID: dogId,
            foodAmount: feedAmount,
            dayType: dayType
          })
          return {scheduleId: data?.schedule?.scheduleId, index}
        })
      );

    } catch (error) {
      console.log("Error2:", error);
      alert("ไม่สามารถบันทึกข้อมูลตารางเวลาได้");
    }
  };

  const onUpdate = async () => {
    try {
      const feeders = await getAllFeeder();
      const schedules = await getAllFeederSchedule();

      if (!feeders.length || !schedules.length) return;

      const day = {
        'เช้า': "morning",
        'กลางวัน': "noon",
        'เย็น': "evening",
      };

      const title = props.title.split(" ")[1] as 'เช้า' | 'กลางวัน' | 'เย็น';
      const scheduleId = schedules.find(s => s.Day_Type === day[title])?.Schedule_ID;
      if (!scheduleId) return;

      const response = await axios.put(
        `${API_BASE_URL}/schedules/${scheduleId}`,
        {
          feederID: feeders[0].Feeder_ID,
          dogID: localStorage.getItem("dogId"),
          foodAmount: feedAmount,
        }
      );

      if (response.status === 200) {
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        props.setOpen(false);
      }
    } catch (error) {
      console.log("Error:", error);
      alert("ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="w-full">
                <div className="mt-3">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    {props.title}
                  </h3>
                  <div className="mt-2">
                    <label
                      htmlFor="amount"
                      className="block mb-1 text-sm font-medium text-[#4D2C1D]"
                    >
                      ระบุปริมาณอาหาร (หน่วย)
                    </label>
                    <select
                      id="amount"
                      value={feedAmount}
                      onChange={(e) => setFeedAmount(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-center"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={onUpdate}
                className="inline-flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-800 sm:ml-3 sm:w-auto"
              >
                บันทึก
              </button>
              <button
                type="button"
                onClick={() => props.setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
