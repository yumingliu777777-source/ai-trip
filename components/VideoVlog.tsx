"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface VideoItem {
  bvid: string;
  title: string;
  pic: string;
  author: string;
  play: number;
  duration: string;
  description: string;
}

interface VideoVlogProps {
  keyword: string;
}

export default function VideoVlog({ keyword }: VideoVlogProps) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!keyword) return;

    let cancelled = false;

    async function searchVideos() {
      setLoading(true);
      setError("");

      try {
        // 通过后端代理请求 Bilibili API，避免 CORS 问题
        const res = await fetch(
          `/api/videos?keyword=${encodeURIComponent(keyword)}`
        );

        if (!res.ok) {
          throw new Error("搜索失败");
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "搜索失败");
        }

        if (!cancelled) {
          // 处理协议相对 URL（//xxx → https://xxx）
          const fixedVideos = (data.videos || []).map((v: VideoItem) => ({
            ...v,
            pic: v.pic.startsWith("//") ? `https:${v.pic}` : v.pic,
          }));
          setVideos(fixedVideos);
        }
      } catch {
        if (!cancelled) {
          setError("视频搜索失败，请稍后重试");
          setVideos([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    searchVideos();

    return () => {
      cancelled = true;
    };
  }, [keyword]);

  if (!keyword) return null;

  return (
    <div className="rounded-3xl border bg-white p-8 shadow">
      <h2 className="text-2xl font-bold text-gray-900">
        🎬 相关 Vlog 视频
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        在 Bilibili 上搜索「{keyword} 旅游 vlog」相关视频
      </p>

      {loading && (
        <div className="mt-6 flex items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-center text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="mt-6 rounded-xl bg-gray-50 p-4 text-center text-gray-500">
          暂无相关视频
        </div>
      )}

      {!loading && videos.length > 0 && (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <a
              key={video.bvid}
              href={`https://www.bilibili.com/video/${video.bvid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <Image
                  src={video.pic}
                  alt={video.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                  {video.duration}
                </span>
              </div>

              <div className="p-4">
                <h3 className="line-clamp-2 font-semibold text-gray-900 group-hover:text-blue-600">
                  {video.title}
                </h3>

                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <span>👤 {video.author}</span>
                  <span>▶️ {formatPlayCount(video.play)}</span>
                </div>

                {video.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {video.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function formatPlayCount(count: number): string {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万`;
  }
  return count.toString();
}