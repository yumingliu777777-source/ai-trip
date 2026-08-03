export default function Hero() {
  return (
    <section className="relative pt-16 text-center">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute left-[10%] top-10 h-16 w-16 rounded-full bg-blue-200/50 blur-xl" />
        <div className="animate-float-delay absolute right-[15%] top-20 h-20 w-20 rounded-full bg-purple-200/50 blur-xl" />
        <div className="animate-float-delay-2 absolute left-[30%] top-40 h-12 w-12 rounded-full bg-green-200/50 blur-xl" />
        <div className="animate-float absolute right-[30%] top-32 h-14 w-14 rounded-full bg-pink-200/50 blur-xl" />
      </div>

      <div className="relative">
        <h1 className="animate-fade-in-up animate-gradient-text text-7xl font-extrabold">
          Trip AI
        </h1>

        <p className="animate-fade-in-up-delay-1 mt-6 text-2xl font-medium text-black">
          AI 帮你规划真正适合你的旅行
        </p>

        <p className="animate-fade-in-up-delay-2 mt-3 text-lg text-gray-700">
          输入需求，自动生成路线、预算、每天行程、Vlog 视频
        </p>

        <div className="animate-fade-in-up-delay-3 mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
            🎬 Vlog 视频
          </span>
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            💰 预算明细
          </span>
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
            🍜 餐饮安排
          </span>
          <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700">
            🏨 住宿推荐
          </span>
        </div>
      </div>
    </section>
  );
}