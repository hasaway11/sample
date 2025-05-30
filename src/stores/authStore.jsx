import { create } from 'zustand';
import { getUsername } from '../utils/authApi';

const useAuthStore = create((set) => ({
  username: null,

  checkAuth: async () => {
    try {
      const res = await getUsername();
      set(()=>({username:res.data}))
    } catch (err) {
      console.log('Login check failed:', err);
      set({ principal: null });
    }
  },

  setUsername: (param) => set({ username: param }),

  resetUsername: () => set({ username: null })
  
}));

export default useAuthStore;