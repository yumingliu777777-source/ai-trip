"use client";

const OPTIONS = [
  "雪山",
  "草原",
  "海边",
  "古镇",
  "摄影",
  "美食",
  "温泉",
  "徒步",
  "露营",
  "亲子",
  "历史文化",
  "小众秘境",
  "城市观光",
  "自然风光",
  "购物",
  "夜生活",
  "博物馆",
  "寺庙",
  "漂流",
  "滑雪",
  "潜水",
  "骑行",
  "观星",
  "民俗体验",
];

interface PreferenceSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function PreferenceSelector({
  value,
  onChange,
}: PreferenceSelectorProps) {
  function toggle(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h3 className="mb-4 text-lg font-bold text-black">
        ⭐ 旅行偏好
      </h3>

      <div className="flex flex-wrap gap-3">
        {OPTIONS.map((option) => {
          const active = value.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`rounded-full border px-4 py-2 transition ${
                active
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-800 hover:bg-blue-50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}