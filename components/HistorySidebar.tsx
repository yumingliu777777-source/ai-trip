"use client";

import type { HistoryItem } from "./types";

interface HistorySidebarProps {
  history: HistoryItem[];
  selectedId: string | null;
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

export default function HistorySidebar({
  history,
  selectedId,
  onSelect,
  onClear,
}: HistorySidebarProps) {
  return (
    <aside className="hidden h-screen w-72 shrink-0 overflow-y-auto border-r bg-white p-6 lg:block">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">
          历史路线
        </h2>

        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-red-500 hover:text-red-700"
          >
            清空
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-4 text-center text-gray-500">
          暂无历史记录
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => {
            const active = item.id === selectedId;

            return (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50"
                }`}
              >
                <h3 className="font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-blue-600">
                  💰 {item.budget}
                </p>

                {item.destination && (
                  <p className="mt-1 text-sm text-gray-600">
                    🎯 {item.destination}
                  </p>
                )}

                {item.totalDays > 0 && (
                  <p className="mt-1 text-sm text-gray-600">
                    📅 {item.totalDays}天 · {item.travelers}人
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </aside>
  );
}