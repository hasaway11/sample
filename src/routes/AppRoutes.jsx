import { Route, Routes } from 'react-router-dom'
import PostList from '../pages/post/PostList'
import NotFound from '../pages/NotFound'
import PostRead from '../pages/post/PostRead'
import MemberLogin from '../pages/member/MemberLogin'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/post/read" element={<PostRead />} />
      <Route path="/member/login" element={<MemberLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes