import type { TripPlan } from "../types/trip";
import VideoVlog from "./VideoVlog";

interface Props {
  result: TripPlan;
}

export default function ResultCard({ result }: Props) {
  return (
    <div className="mt-10 space-y-6">
      {/* 相关视频 */}
      <VideoVlog keyword={result.destination || result.title} />
      {/* 标题 */}
      <div className="rounded-3xl bg-white p-8 shadow-lg border">
        <h1 className="text-4xl font-bold text-gray-900">
          {result.title}
        </h1>

        <p className="mt-3 text-xl text-blue-600 font-semibold">
          💰 {result.budget}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {result.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {result.overview && (
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            {result.overview}
          </p>
        )}
      </div>

      {/* 预算明细 */}
      {result.budgetBreakdown && (
        <div className="rounded-3xl border bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-gray-900">
            💰 预算明细
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-blue-50 p-4">
              <p className="text-sm text-gray-600">🚗 交通</p>
              <p className="mt-1 text-2xl font-bold text-blue-700">
                ¥{result.budgetBreakdown.transport.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl bg-green-50 p-4">
              <p className="text-sm text-gray-600">🏨 住宿</p>
              <p className="mt-1 text-2xl font-bold text-green-700">
                ¥{result.budgetBreakdown.hotel.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-4">
              <p className="text-sm text-gray-600">🍜 餐饮</p>
              <p className="mt-1 text-2xl font-bold text-orange-700">
                ¥{result.budgetBreakdown.food.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl bg-purple-50 p-4">
              <p className="text-sm text-gray-600">🎫 门票</p>
              <p className="mt-1 text-2xl font-bold text-purple-700">
                ¥{result.budgetBreakdown.tickets.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl bg-pink-50 p-4">
              <p className="text-sm text-gray-600">🛍️ 购物</p>
              <p className="mt-1 text-2xl font-bold text-pink-700">
                ¥{result.budgetBreakdown.shopping.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-sm text-gray-600">📦 其他</p>
              <p className="mt-1 text-2xl font-bold text-gray-700">
                ¥{result.budgetBreakdown.other.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-gray-900 p-4 text-center">
            <p className="text-sm text-gray-400">总预算</p>
            <p className="mt-1 text-3xl font-bold text-white">
              ¥{result.budgetBreakdown.total.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* 每日行程 */}
      {result.days.map((day) => (
        <div
          key={day.day}
          className="rounded-3xl border bg-white p-8 shadow"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              📅 {day.day} {day.date && <span className="text-lg text-gray-500">· {day.date}</span>}
            </h2>

            {day.dailyBudget > 0 && (
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                当日预算 ¥{day.dailyBudget.toLocaleString()}
              </span>
            )}
          </div>

          <div className="mt-5 space-y-3 text-gray-700">
            <p>
              📍 <span className="font-semibold">{day.place}</span>
            </p>

            {day.drive && <p>🚗 {day.drive}</p>}
            {day.hotel && <p>🏨 {day.hotel}</p>}
          </div>

          {/* 时间安排 */}
          {day.schedule && day.schedule.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-lg">🕐 时间安排</h3>
              <div className="mt-3 space-y-2">
                {day.schedule.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 rounded-xl bg-gray-50 p-3"
                  >
                    <span className="w-28 shrink-0 font-mono text-sm font-semibold text-blue-600">
                      {slot.time}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {slot.activity}
                      </p>
                      {slot.location && (
                        <p className="text-sm text-gray-500">
                          📍 {slot.location}
                        </p>
                      )}
                    </div>
                    {slot.cost > 0 && (
                      <span className="shrink-0 text-sm font-semibold text-gray-600">
                        ¥{slot.cost}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 餐饮 */}
          {day.meals && (
            <div className="mt-6">
              <h3 className="font-bold text-lg">🍽️ 餐饮安排</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl bg-orange-50 p-4">
                  <p className="text-sm font-semibold text-orange-700">🌅 早餐</p>
                  <p className="mt-1 text-gray-700">{day.meals.breakfast}</p>
                </div>
                <div className="rounded-xl bg-yellow-50 p-4">
                  <p className="text-sm font-semibold text-yellow-700">☀️ 午餐</p>
                  <p className="mt-1 text-gray-700">{day.meals.lunch}</p>
                </div>
                <div className="rounded-xl bg-red-50 p-4">
                  <p className="text-sm font-semibold text-red-700">🌙 晚餐</p>
                  <p className="mt-1 text-gray-700">{day.meals.dinner}</p>
                </div>
              </div>
              {day.meals.cost > 0 && (
                <p className="mt-3 text-sm font-semibold text-gray-600">
                  餐饮费用：¥{day.meals.cost}
                </p>
              )}
            </div>
          )}

          {/* 交通 */}
          {day.transport && (
            <div className="mt-6">
              <h3 className="font-bold text-lg">🚄 交通安排</h3>
              <div className="mt-3 rounded-xl bg-blue-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {day.transport.mode} · {day.transport.route}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      ⏱️ {day.transport.duration}
                    </p>
                  </div>
                  {day.transport.cost > 0 && (
                    <span className="text-lg font-bold text-blue-700">
                      ¥{day.transport.cost}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 住宿详情 */}
          {day.hotelDetail && (
            <div className="mt-6">
              <h3 className="font-bold text-lg">🏨 住宿详情</h3>
              <div className="mt-3 rounded-xl bg-green-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {day.hotelDetail.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      📍 {day.hotelDetail.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-700">
                      ¥{day.hotelDetail.price}/晚
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      ⭐ {day.hotelDetail.rating} 分
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 亮点 */}
          {day.highlights && day.highlights.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-lg">✨ 今日亮点</h3>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                {day.highlights.map((item) => (
                  <li key={item} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 小贴士 */}
          {day.tips && day.tips.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-lg">💡 小贴士</h3>
              <ul className="mt-3 space-y-2">
                {day.tips.map((tip, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="mt-1 text-blue-500">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      {/* 行李清单 */}
      {result.packingList && result.packingList.length > 0 && (
        <div className="rounded-3xl border bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-gray-900">
            🎒 行李清单
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {result.packingList.map((item) => (
              <span
                key={item}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 天气建议 */}
      {result.weatherAdvice && (
        <div className="rounded-3xl border bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-gray-900">
            🌤️ 天气建议
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700">
            {result.weatherAdvice}
          </p>
        </div>
      )}

      {/* 紧急联系方式 */}
      {result.emergencyContacts && result.emergencyContacts.length > 0 && (
        <div className="rounded-3xl border bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-gray-900">
            📞 紧急联系方式
          </h2>
          <ul className="mt-4 space-y-2">
            {result.emergencyContacts.map((contact, idx) => (
              <li key={idx} className="text-gray-700">
                {contact}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}