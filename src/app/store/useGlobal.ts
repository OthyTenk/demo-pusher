import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalStore {
  currentUser: string | null;
  currentUserId: string;
  gameCode: string;
}

interface IActions {
  setCurrentUser: (name: string) => void;
  setUserInfo: (name: string, id: string) => void;
  setGameCode: (code: string) => void;
  reset: () => void;
}

// Initialize a default state
const INITIAL_STATE: GlobalStore = {
  currentUser: "",
  currentUserId: "",
  gameCode: "",
};

// const useGlobal = create<GlobalStore & IActions>((set) => ({
//   currentUser: INITIAL_STATE.currentUser,
//   currentUserId: INITIAL_STATE.currentUserId,
//   gameCode: INITIAL_STATE.gameCode,

//   setCurrentUser: (name) => set({ currentUser: name }),
//   setUserInfo: (name, id) => set({ currentUser: name, currentUserId: id }),
//   setGameCode: (code) => set({ gameCode: code }),
// }));

const useGlobal = create(
  persist<GlobalStore & IActions>(
    (set) => ({
      currentUser: INITIAL_STATE.currentUser,
      currentUserId: INITIAL_STATE.currentUserId,
      gameCode: INITIAL_STATE.gameCode,

      setCurrentUser: (name) => set({ currentUser: name }),
      setUserInfo: (name, id) => set({ currentUser: name, currentUserId: id }),
      setGameCode: (code) => set({ gameCode: code }),
      reset: () =>
        set({
          currentUser: INITIAL_STATE.currentUser,
          currentUserId: INITIAL_STATE.currentUserId,
          gameCode: INITIAL_STATE.gameCode,
        }),
    }),
    {
      name: "global-storage",
    }
  )
);

export default useGlobal;
