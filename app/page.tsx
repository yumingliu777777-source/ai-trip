"use client";

import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import SearchBox from "../components/SearchBox";
import PopularRoutes from "../components/PopularRoutes";
import HistorySidebar from "../components/HistorySidebar";
import ResultCard from "../components/ResultCard";

import type { HistoryItem } from "../components/types";

export default function Home() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selected, setSelected] = useState<HistoryItem | null>(null);


  // 读取历史
  useEffect(() => {
    const saved = localStorage.getItem("trip-history");

    if (saved) {
      const data = JSON.parse(saved) as HistoryItem[];

      // 使用 queueMicrotask 避免在 effect 中同步 setState
      queueMicrotask(() => {
        setHistory(data);

        if (data.length > 0) {
          setSelected(data[0]);
        }
      });
    }
  }, []);


  // 新增历史
  function addHistory(item: HistoryItem) {

    setHistory((prev) => {

      const updated = [
        item,
        ...prev,
      ];


      localStorage.setItem(
        "trip-history",
        JSON.stringify(updated)
      );


      return updated;
    });


    // 自动显示最新生成路线
    setSelected(item);
  }



  // 点击历史
  function selectHistory(item: HistoryItem) {
    setSelected(item);
  }



  // 清空历史
  function clearHistory() {

    localStorage.removeItem(
      "trip-history"
    );

    setHistory([]);

    setSelected(null);
  }



  return (
    <main className="flex min-h-screen bg-gray-100">


      <HistorySidebar
        history={history}
        selectedId={selected?.id ?? null}
        onSelect={selectHistory}
        onClear={clearHistory}
      />



      <div className="flex-1">

        <div className="mx-auto w-full max-w-6xl">


          <Hero />


          <SearchBox
            onGenerate={addHistory}
          />



          {/* 当前选择的历史路线 */}
          {selected && (
            <div className="px-6 pb-10">
              <ResultCard
                result={selected}
              />
            </div>
          )}



          <PopularRoutes />


        </div>

      </div>


    </main>
  );
}