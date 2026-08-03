const routes = [
  {
    name: "🏔 甘南",
    desc: "雪山 · 草原 · 藏寨",
  },
  {
    name: "🌲 呼伦贝尔",
    desc: "森林 · 草原 · 边境",
  },
  {
    name: "❄ 香格里拉",
    desc: "雪山 · 峡谷 · 高原",
  },
  {
    name: "🌋 宁蒙环线",
    desc: "沙漠 · 火山 · 草原",
  },
];

export default function PopularRoutes() {
  return (
    <section className="mx-auto mt-20 max-w-5xl">

      <h2 className="mb-8 text-3xl font-bold text-black">
        热门路线
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {routes.map((route) => (

          <div
            key={route.name}
            className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-lg transition"
          >

            <h3 className="text-2xl font-bold text-black">
              {route.name}
            </h3>

            <p className="mt-3 text-gray-700">
              {route.desc}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}