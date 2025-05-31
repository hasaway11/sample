import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

import usePostStore from '../../stores/postStore';
import useAuthStore from '../../stores/authStore';
import useComment from '../../hooks/useComment';
import { erase, read } from '../../utils/postApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import CommentInput from '../../components/comment/CommentInput';
import CommentList from '../../components/comment/CommentList';

function PostRead() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const pno = params.get('pno');
  
  if(!pno)
    navigate("/");

  const setPost = usePostStore(state=>state.setPost);
  const setComments = usePostStore(state=>state.setComments);
  const post = usePostStore(state=>state.post);
  const username = useAuthStore(state=>state.username);
  const vComment = useComment();

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      try {
        const {data} = await read(pno);
        const {comments, ...postWithoutComments} = data;
        setPost(postWithoutComments);
        setComments(comments);
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [pno]);

  const deletePost = ()=>{
    erase(pno).then(()=>navigate("/")).catch(res=>console.log(res));
  }

  if(loading || !post) return <LoadingSpinner />

  return (
    <>
     <div className="read-title mb-2">
        {post.title}
      </div>

      <div className="mb-3" style={{display:'flex', justifyContent:'space-between'}}>
        <div>
          <span className='read-value'>{post.writer}</span>
          <span className='read-value'> | </span>
          <span className="read-key">글번호 </span>
          <span className='read-value'>{post.bno}</span>
          <span className='read-value'> | </span>
          <span className='read-value'>{post.writeTime}</span>
          <span className='read-value'> | </span> 
          <span className="read-key">조회 </span>
          <span className='read-value'>{post.readCnt}</span>
          <span className='read-value'> | </span> 
          <span className="read-key">추천 </span>
          <span className='read-value'>{post.goodCnt}</span>
        </div>
        {
          (username!=null && username===post.writer) &&  <Button variant="primary">좋아요</Button>
        }
      </div>

      <div style={{minHeight:"600px", backgroundColor:'#eee'}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />

      {
        (username!=null && username===post.writer) &&
        <div className='mt-3 mb-3'>
          <Button variant="success" onClick={()=>navigate(`/post/update?pno=${pno}`)} className="me-3">변경으로</Button>
          <Button variant="danger" onClick={deletePost}>삭제하기</Button>
        </div>
      }

      <div className='mt-3 mb-3'>
        { username!=null && <CommentInput pno={pno} value={vComment.value} message={vComment.message} change={vComment.change} check={vComment.check} write={vComment.write} /> }
        <CommentList loginId={username} />
      </div>
    </>
  )
}

export default PostRead