import { create } from "zustand";
import { fetchUrl } from "../helper/fetchUrl";

interface Type {
  alerts: [];
  fetchAlerts: () => void;
}

export const useAlertsStore = create<Type>((set) => ({
  alerts: [],
  fetchAlerts: async () => {
    const { data, message, error } = await fetchUrl("/api/alerts", "GET");
    console.log(message);
    set(() => ({ alerts: data }));
  },
}));
