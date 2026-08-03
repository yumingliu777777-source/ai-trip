import type { TripPlan } from "../types/trip";

export interface HistoryItem extends TripPlan {
  id: string;
  createdAt: number;
}