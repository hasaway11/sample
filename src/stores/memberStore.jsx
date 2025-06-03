import { create } from "zustand";

const useMemberStore = create((set) => ({
  member: undefined,
  isPasswordVerified: false,

  setMember: (object) => set(state => ({...state, member:object})),

  verifyPassword: () => set(state=>({...state, isPasswordVerified: true })),
}));

export default useMemberStore;