"use client";

interface TripFormProps {
  departure: string;
  setDeparture: (value: string) => void;

  destination: string;
  setDestination: (value: string) => void;

  startDate: string;
  setStartDate: (value: string) => void;

  days: string;
  setDays: (value: string) => void;

  budget: string;
  setBudget: (value: string) => void;

  travelers: string;
  setTravelers: (value: string) => void;

  transport: string;
  setTransport: (value: string) => void;

  avoid: string;
  setAvoid: (value: string) => void;

  notes: string;
  setNotes: (value: string) => void;
}

export default function TripForm({
  departure,
  setDeparture,
  destination,
  setDestination,
  startDate,
  setStartDate,
  days,
  setDays,
  budget,
  setBudget,
  travelers,
  setTravelers,
  transport,
  setTransport,
  avoid,
  setAvoid,
  notes,
  setNotes,
}: TripFormProps) {
  return (
    <div className="space-y-6 rounded-2xl bg-white p-6 shadow">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            📍 出发地
          </label>

          <input
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="w-full rounded-xl border p-3 text-black"
            placeholder="例如：广州"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            🎯 目的地
          </label>

          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full rounded-xl border p-3 text-black"
            placeholder="例如：云南（留空由AI推荐）"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            📅 出发日期
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-xl border p-3 text-black"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            📅 天数
          </label>

          <input
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full rounded-xl border p-3 text-black"
            placeholder="7"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            💰 预算
          </label>

          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-xl border p-3 text-black"
            placeholder="6000"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            👥 人数
          </label>

          <input
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            className="w-full rounded-xl border p-3 text-black"
            placeholder="2"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-semibold text-gray-800">
          🚗 出行方式
        </label>

        <select
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
          className="w-full rounded-xl border p-3 text-black"
        >
          <option>自驾</option>
          <option>高铁</option>
          <option>飞机</option>
          <option>公共交通</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-semibold text-gray-800">
          🚫 避开地区
        </label>

        <input
          value={avoid}
          onChange={(e) => setAvoid(e.target.value)}
          className="w-full rounded-xl border p-3 text-black"
          placeholder="例如：新疆"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold text-gray-800">
          ✍️ 其他要求
        </label>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="h-32 w-full rounded-xl border p-3 text-black"
          placeholder="例如：喜欢摄影，不想太赶，希望每天车程不要超过4小时..."
        />
      </div>
    </div>
  );
}