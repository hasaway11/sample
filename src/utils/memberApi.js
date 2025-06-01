import api from "./api";

export const idAvailable = (username)=>api.get(`/api/members/check-username?username=${username}`);

export const signup = (formData)=>api.post('/api/members/new', formData);

export const findUsername = (email)=>api.get(`/api/members/username?email=${email}`);

export const resetPassword = (object)=>api.put(`/api/members/password`, new URLSearchParams(object));

export const checkPassword = (object)=>api.get('/api/members/check-password', new URLSearchParams(object));

export const read = ()=>api.get('/api/members/member');

export const changePassword = (object)=>api.patch('/api/members/password', new URLSearchParams(object));

export const resign = ()=>api.delete('/api/members/member');