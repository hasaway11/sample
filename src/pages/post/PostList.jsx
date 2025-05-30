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
  const [loading, setLoading] = useState(false);

  let pageno = parseInt(params.get('pageno'), 10);
  if (isNaN(pageno) || pageno < 1)
    pageno = 1;

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const { data } = await readAll(pageno);
        const {posts, ...pagination} = data;
        setPosts(posts);
        setPagination(pagination);
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  if(loading) return <LoadingSpinner />

  return (
    <>
      <Posts />
      <Paginations />
    </>
  )
}

export default PostList