import { create } from 'zustand';
import { getUsername } from '../utils/authApi';

const useAuthStore = create((set) => ({
  // undefined : 아직 체크안 한 상태
  // null : 비로그인
  username: undefined,

  checkAuth: async () => {
    try {
      const res = await getUsername();
      set(()=>({username:res.data}))
    } catch (err) {
      console.log('Login check failed:', err);
      set({ username: null });
    }
  },

  setUsername: (param) => set({ username: param }),

  resetUsername: () => set({ username: null })
  
}));

export default useAuthStore;