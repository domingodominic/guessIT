import { create } from "zustand";

const useLeaderStore = create((set) => ({
  fastfoodLeader: {},

  setFastfoodLeader: (fastfoodLeader) => set({ fastfoodLeader }),
}));

export default useLeaderStore;
