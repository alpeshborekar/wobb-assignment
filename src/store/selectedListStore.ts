import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, SelectedProfile, UserProfileSummary } from "@/types";

interface SelectedListState {
  profiles: SelectedProfile[];
  addProfile: (profile: UserProfileSummary, platform: Platform) => void;
  removeProfile: (userId: string) => void;
  isSelected: (userId: string) => boolean;
  clear: () => void;
}

export const useSelectedListStore = create<SelectedListState>()(
  persist(
    (set, get) => ({
      profiles: [],

      addProfile: (profile, platform) => {
        if (get().isSelected(profile.user_id)) return;
        set((state) => ({
          profiles: [
            ...state.profiles,
            { ...profile, platform, addedAt: Date.now() },
          ],
        }));
      },

      removeProfile: (userId) => {
        set((state) => ({
          profiles: state.profiles.filter((p) => p.user_id !== userId),
        }));
      },

      isSelected: (userId) => get().profiles.some((p) => p.user_id === userId),

      clear: () => set({ profiles: [] }),
    }),
    { name: "wobb-selected-profiles" }
  )
);
