import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

const SYSTEM_PROMPT = `
你是一位专业旅行规划师。

请根据用户需求规划旅行路线。

【要求】

1. 必须只返回 JSON。
2. 不要解释。
3. 不要使用 markdown。
4. 不要使用 \`\`\`json。
5. 不要输出任何额外文字。
6. 所有金额单位为人民币（元）。
7. 预算明细必须合理分配，总和等于总预算。
8. 每天必须有详细的时间安排、餐饮、交通、住宿信息。

JSON格式：

{
  "title": "路线名称",
  "destination": "目的地",
  "departure": "出发地",
  "totalDays": 7,
  "travelers": 2,
  "transportMode": "自驾",
  "budget": "总预算描述，如：人均5000元，总计10000元",
  "budgetBreakdown": {
    "transport": 3000,
    "hotel": 3000,
    "food": 2000,
    "tickets": 1000,
    "shopping": 500,
    "other": 500,
    "total": 10000
  },
  "tags": ["标签1", "标签2"],
  "overview": "行程概述，2-3句话介绍整体路线特色",
  "days": [
    {
      "day": "Day1",
      "date": "第1天",
      "place": "主要地点",
      "drive": "车程描述",
      "hotel": "住宿描述",
      "highlights": ["景点1", "景点2"],
      "schedule": [
        {
          "time": "08:00-09:00",
          "activity": "活动内容",
          "location": "地点",
          "cost": 50
        }
      ],
      "meals": {
        "breakfast": "早餐内容",
        "lunch": "午餐内容",
        "dinner": "晚餐内容",
        "cost": 200
      },
      "transport": {
        "mode": "交通方式",
        "route": "路线",
        "duration": "耗时",
        "cost": 100
      },
      "hotelDetail": {
        "name": "酒店名称",
        "location": "位置",
        "price": 400,
        "rating": 4.5
      },
      "dailyBudget": 1500,
      "tips": ["小贴士1", "小贴士2"]
    }
  ],
  "packingList": ["行李1", "行李2"],
  "emergencyContacts": ["紧急联系方式1", "紧急联系方式2"],
  "weatherAdvice": "天气建议"
}
`;

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let text = completion.choices[0].message.content ?? "";

    console.log("===== AI 原始返回 =====");
    console.log(text);

    // 去掉 markdown 代码块
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");

    // 截取 JSON
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("AI 没有返回合法 JSON");
    }

    const json = text.substring(start, end + 1);

    const result = JSON.parse(json);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("====== DeepSeek Error ======");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "未知错误",
      },
      {
        status: 500,
      }
    );
  }
}