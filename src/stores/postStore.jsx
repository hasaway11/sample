import { create } from "zustand";

const usePostStore=create((set)=>({
    posts: null,
    pagination:null,
    post: null,
    comments: null,

    setPosts: (param)=>set(state=>({...state, posts:param})),

    setPagination: (param)=>set(state=>({...state, pagination:param})),

    setPost: (param)=>set(state=>({...state, post:param})),

    setComments: (param)=>set(state=>({...state, comments:param})),

    updateGoodCnt: (newGoodCnt) =>set((state) => ({post: state.post ? { ...state.post, goodCnt: newGoodCnt } : null })),
}))

export default usePostStore;