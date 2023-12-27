import { create } from "zustand";

interface GlobalStore {
  currentUser: string | null;
  currentUserId: string;
  gameCode: string;
}

interface IActions {
  setCurrentUser: (name: string) => void;
  setUserInfo: (name: string, id: string) => void;
  setGameCode: (code: string) => void;
}

const useGlobal = create<GlobalStore & IActions>((set) => ({
  currentUser: "",
  currentUserId: "",
  gameCode: "",
  setCurrentUser: (name) => set({ currentUser: name }),
  setUserInfo: (name, id) => set({ currentUser: name, currentUserId: id }),
  setGameCode: (code) => set({ gameCode: code }),
}));

export default useGlobal;
