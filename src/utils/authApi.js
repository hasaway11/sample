import api from "./api";

export const getUsername = ()=>api.get('/api/auth/check');

export const login = (object)=>api.post('/login', new URLSearchParams(object));

export const logout = ()=>api.post('/logout');