import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import usePostStore from "../../stores/postStore";
import {readAll} from '../../utils/postApi'
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Posts from "../../components/post/Posts";
import Paginations from "../../components/post/Paginations";

function PostList() {
  const [params] = useSearchParams();

  const setPosts = usePostStore(state=>state.setPosts);
  const setPagination = usePostStore(state=>state.setPagination);
  const posts = usePostStore(state=>state.posts);

  const [loading, setLoading] = useState(false);

  let pageno = parseInt(params.get('pageno'), 10);
  if (isNaN(pageno) || pageno < 1)
    pageno = 1;

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const response = await readAll(pageno);
        const {posts, ...pagination} = response.data;
        setPosts(posts);
        setPagination(pagination);
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [pageno]);

  if(loading || posts===null) return <LoadingSpinner />
  if(posts.length===0) return <div>게시글이 없습니다</div>

  return (
    <>
      <Posts />
      <Paginations />
    </>
  )
}

export default PostList