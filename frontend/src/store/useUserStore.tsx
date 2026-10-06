import { create } from "zustand";

interface Type {
  userId: any;
  userRole: any;
  fetchUser: any;
}

export const useUserStore = create<Type>((set) => ({
  userId: null,
  userRole: null,
  fetchUser: (id: number, role: string) => {
    set(() => ({ userId: id, userRole: role }));
  },
}));
