import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword") || "";

    if (!keyword) {
      return NextResponse.json(
        { success: false, message: "缺少关键词" },
        { status: 400 }
      );
    }

    // 通过后端代理请求 Bilibili API，避免 CORS 问题
    const res = await fetch(
      `https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=${encodeURIComponent(
        keyword + " 旅游 vlog"
      )}&page=1&page_size=6`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": "https://search.bilibili.com/",
          "Origin": "https://search.bilibili.com",
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "Cookie": "buvid3=infoc; b_nut=1700000000; CURRENT_FNVAL=4048",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      // 如果搜索 API 失败，尝试使用搜索建议 API
      const suggestRes = await fetch(
        `https://s.search.bilibili.com/cate/search?search_type=video&keyword=${encodeURIComponent(
          keyword + " 旅游 vlog"
        )}&page=1&page_size=6`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://search.bilibili.com/",
            "Accept": "application/json, text/plain, */*",
          },
          cache: "no-store",
        }
      );

      if (!suggestRes.ok) {
        throw new Error(`Bilibili API 返回 ${res.status}`);
      }

      const suggestData = await suggestRes.json();

      interface BiliVideoItem {
        bvid: string;
        title: string;
        pic: string;
        author: string;
        play: number;
        duration: string;
        description?: string;
      }

      const results = (suggestData.data?.result || []).map(
        (item: BiliVideoItem) => ({
          bvid: item.bvid,
          title: item.title.replace(/<[^>]*>/g, ""),
          pic: item.pic,
          author: item.author,
          play: item.play,
          duration: item.duration,
          description: item.description?.replace(/<[^>]*>/g, "") || "",
        })
      );

      return NextResponse.json({ success: true, videos: results });
    }

    const data = await res.json();

    if (data.code !== 0) {
      throw new Error(data.message || "Bilibili 搜索失败");
    }

    interface BiliVideoItem {
      bvid: string;
      title: string;
      pic: string;
      author: string;
      play: number;
      duration: string;
      description?: string;
    }

    const results = (data.data?.result || []).map((item: BiliVideoItem) => ({
      bvid: item.bvid,
      title: item.title.replace(/<[^>]*>/g, ""),
      pic: item.pic,
      author: item.author,
      play: item.play,
      duration: item.duration,
      description: item.description?.replace(/<[^>]*>/g, "") || "",
    }));

    return NextResponse.json({ success: true, videos: results });
  } catch (error: unknown) {
    console.error("====== Bilibili Search Error ======");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "视频搜索失败",
      },
      { status: 500 }
    );
  }
}