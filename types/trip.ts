// 每日行程中的时间安排
export interface TimeSlot {
  time: string;        // 时间段，如 "08:00-09:00"
  activity: string;    // 活动内容
  location: string;    // 地点
  cost: number;        // 费用（元）
}

// 每日餐饮安排
export interface MealPlan {
  breakfast: string;   // 早餐
  lunch: string;       // 午餐
  dinner: string;      // 晚餐
  cost: number;        // 当日餐饮总费用（元）
}

// 每日交通安排
export interface TransportPlan {
  mode: string;        // 交通方式
  route: string;       // 路线
  duration: string;    // 耗时
  cost: number;        // 费用（元）
}

// 每日住宿安排
export interface HotelPlan {
  name: string;        // 酒店名称
  location: string;    // 位置
  price: number;       // 每晚价格（元）
  rating: number;      // 评分（1-5）
}

// 每日行程
export interface DayPlan {
  day: string;             // 如 "Day1"
  date: string;            // 日期
  place: string;           // 主要地点
  drive: string;           // 车程描述
  hotel: string;           // 住宿描述
  highlights: string[];    // 亮点
  schedule: TimeSlot[];    // 详细时间安排
  meals: MealPlan;         // 餐饮安排
  transport: TransportPlan; // 交通安排
  hotelDetail: HotelPlan;  // 住宿详情
  dailyBudget: number;     // 当日预算（元）
  tips: string[];          // 当日小贴士
}

// 预算明细
export interface BudgetBreakdown {
  transport: number;   // 交通费用
  hotel: number;       // 住宿费用
  food: number;        // 餐饮费用
  tickets: number;     // 门票费用
  shopping: number;    // 购物费用
  other: number;       // 其他费用
  total: number;       // 总费用
}

// 整体旅行计划
export interface TripPlan {
  title: string;           // 路线名称
  destination: string;     // 目的地
  departure: string;       // 出发地
  totalDays: number;       // 总天数
  travelers: number;       // 人数
  transportMode: string;   // 主要交通方式
  budget: string;          // 预算描述
  budgetBreakdown: BudgetBreakdown; // 预算明细
  tags: string[];          // 标签
  overview: string;        // 行程概述
  days: DayPlan[];         // 每日行程
  packingList: string[];   // 行李清单
  emergencyContacts: string[]; // 紧急联系方式
  weatherAdvice: string;   // 天气建议
}