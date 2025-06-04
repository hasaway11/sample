import { Route, Routes } from 'react-router-dom';
import PostList from '../pages/post/PostList';

import NotFound from '../pages/NotFound';
import PostRead from '../pages/post/PostRead';
import PostWrite from '../pages/post/PostWrite';
import PostUpdate from '../pages/post/PostUpdate';

import MemberSignup from '../pages/member/MemberSignup';
import MemberLogin from '../pages/member/MemberLogin';
import MemberFindUsername from '../pages/member/MemberFindUsername';
import MemberCheckPassword from '../pages/member/MemberCheckPassword';
import MemberRead from '../pages/member/MemberRead';
import MemberChangePassword from '../pages/member/MemberChangePassword'

import PrivateRoute from '../routes/PrivateRoute'
import PublicRoute from '../routes/PublicRoute'
import MemberEmailVerified from '../pages/member/MemberEmailVerified';
import MemberResetPassword from '../pages/member/MemberResetPassword';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/post/read" element={<PostRead />} />
      <Route path="/post/write" element={<PrivateRoute element={<PostWrite />} /> } />
      <Route path="/post/update" element={<PrivateRoute element={<PostUpdate />} /> } />
      <Route path="/member/signup" element={<PublicRoute element={<MemberSignup />} /> } />
      <Route path="/member/login" element={<PublicRoute element={<MemberLogin />} /> } />
      <Route path="/member/email-verified" element={<PublicRoute element={<MemberEmailVerified />} />} />
      <Route path="/member/find-username" element={<PublicRoute element={<MemberFindUsername />} /> } />
      <Route path="/member/find-password" element={<PublicRoute element={<MemberResetPassword />} /> } />
      <Route path="/member/check-password" element={<PrivateRoute element={<MemberCheckPassword />} /> } />
      <Route path="/member/read" element={<PrivateRoute element={<MemberRead />} /> } />
      <Route path="/member/change-password" element={<PrivateRoute element={<MemberChangePassword />} /> } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes