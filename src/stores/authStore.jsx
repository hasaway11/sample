import { create } from 'zustand';
import { getUsername } from '../utils/authApi';

const useAuthStore = create((set) => ({
  // undefined : 아직 체크안 한 상태, null : 비로그인
  username: undefined,
  isPasswordVerified: false,

  checkAuth: async () => {
    try {
      const res = await getUsername();
      set(state=>({...state, username:res.data.username }));
    } catch (err) {
      if(err.status!==409)
        console.log(err);
      set(state=>({...state, username: null }));
    }
  },

  setUsername: (param) => set(state=>({...state, username: param })),

  resetUsername: () => set(state=>({...state, username: null })),

  verifyPassword: () => set(state=>({...state, isPasswordVerified: true }))
}));

export default useAuthStore;