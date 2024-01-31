import { create } from "zustand";

const useLeaderStore = create((set) => ({
  fastfoodLeader: {},
  dialogOpen: false,
  highScore: 0,

  setFastfoodLeader: (fastfoodLeader) => set({ fastfoodLeader }),
  setDialogOpen: (dialogOpen) => set({ dialogOpen }),
  setHighScore: (highScore) => set({ highScore }),
}));

export default useLeaderStore;
