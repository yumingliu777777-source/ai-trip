"use client";

import { useState } from "react";

import ResultCard from "./ResultCard";
import TripForm from "./TripForm";
import PreferenceSelector from "./PreferenceSelector";

import type { TripPlan } from "../types/trip";
import type { HistoryItem } from "./types";

interface SearchBoxProps {
  onGenerate: (item: HistoryItem) => void;
}

export default function SearchBox({
  onGenerate,
}: SearchBoxProps) {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState("7");
  const [budget, setBudget] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [transport, setTransport] = useState("自驾");
  const [avoid, setAvoid] = useState("");
  const [notes, setNotes] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);

  const [result, setResult] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(false);

  function buildPrompt() {
    return `
请规划一次旅行。

出发地：
${departure}

目的地：
${destination || "（未指定，请根据其他条件推荐合适的目的地）"}

出发日期：
${startDate || "（未指定）"}

旅行天数：
${days}天

预算：
${budget}元

人数：
${travelers}人

交通方式：
${transport}

喜欢：
${preferences.join("、") || "（无特别偏好）"}

避开：
${avoid || "（无）"}

其他要求：
${notes || "（无）"}

请根据以上信息生成详细旅行计划，包括：
1. 每天的详细时间安排（几点到几点做什么）
2. 每天的餐饮安排（早中晚餐吃什么）
3. 每天的交通安排（怎么去、耗时多久、费用多少）
4. 每天的住宿安排（住哪里、价格、评分）
5. 预算明细（交通、住宿、餐饮、门票、购物、其他）
6. 行李清单
7. 天气建议
8. 紧急联系方式
`;
  }

  async function handlePlan() {
    if (!departure.trim()) {
      alert("请输入出发地");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: buildPrompt(),
        }),
      });

      const data: TripPlan = await res.json();

      if (!res.ok) {
        throw new Error("AI规划失败");
      }

      setResult(data);

      const historyItem: HistoryItem = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        ...data,
      };

      onGenerate(historyItem);
    } catch (error) {
      console.error(error);
      alert("规划失败，请重试");
    } finally {
      setLoading(false);
    }
  }

  function clearForm() {
    setDeparture("");
    setDestination("");
    setStartDate("");
    setDays("7");
    setBudget("");
    setTravelers("2");
    setTransport("自驾");
    setAvoid("");
    setNotes("");
    setPreferences([]);
    setResult(null);
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-5xl space-y-6 px-6">
      <TripForm
        departure={departure}
        setDeparture={setDeparture}
        destination={destination}
        setDestination={setDestination}
        startDate={startDate}
        setStartDate={setStartDate}
        days={days}
        setDays={setDays}
        budget={budget}
        setBudget={setBudget}
        travelers={travelers}
        setTravelers={setTravelers}
        transport={transport}
        setTransport={setTransport}
        avoid={avoid}
        setAvoid={setAvoid}
        notes={notes}
        setNotes={setNotes}
      />

      <PreferenceSelector
        value={preferences}
        onChange={setPreferences}
      />

      <div className="flex justify-center gap-4">
        <button
          onClick={handlePlan}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-10 py-3 text-lg font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "AI规划中..." : "开始规划"}
        </button>

        <button
          onClick={clearForm}
          className="rounded-xl border border-gray-300 px-8 py-3 text-gray-700 hover:bg-gray-100"
        >
          清空
        </button>
      </div>

      {result && (
        <ResultCard
          result={result}
        />
      )}
    </div>
  );
}