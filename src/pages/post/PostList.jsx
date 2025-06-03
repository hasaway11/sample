import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import usePostStore from "../../stores/postStore";
import {readAll} from '../../utils/postApi'
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Posts from "../../components/post/Posts";
import Paginations from "../../components/post/Paginations";
import { Alert } from "react-bootstrap";

function PostList() {
  // 1. pageno 파라미터 꺼내기
  const [params] = useSearchParams();
  let pageno = parseInt(params.get('pageno'), 10);
  if (isNaN(pageno) || pageno < 1)
    pageno = 1;

  // 2. 로딩 상태와 에러 메시지 state 정의
  const [loading, setLoading] = useState(false);
  const [isFail, setFail] = useState(false);

  // 3. store에서 상태와 액션을 select
  const setPosts = usePostStore(state=>state.setPosts);
  const setPagination = usePostStore(state=>state.setPagination);
  const posts = usePostStore(state=>state.posts);

  // 4. posts와 pagination 정보를 가져와 set한다
  useEffect(() => {
    async function fetch() {
      setFail(false);
      setLoading(true);
      try {
        const response = await readAll(pageno);
        const {posts, ...pagination} = response.data;
        setPosts(posts);
        setPagination(pagination);
      } catch(err) {
        setFail(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [pageno]);

  // 5. 에러 메시지 출력, 로딩 메시지 출력
  if(isFail) 
    return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>
  if(loading || posts===null) return <LoadingSpinner />

  return (
    <>
      <Posts />
      <Paginations />
    </>
  )
}

export default PostList