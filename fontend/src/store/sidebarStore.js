import { create } from "zustand";
const useSidebarStore = create((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (value) => set({ isSidebarOpen: value }),
}));
export default useSidebarStore;