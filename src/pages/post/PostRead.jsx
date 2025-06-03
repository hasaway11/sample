import { useNavigate, useSearchParams } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

import usePostStore from '../../stores/postStore';
import useAuthStore from '../../stores/authStore';
import useComment from '../../hooks/useComment';
import { erase, read } from '../../utils/postApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import CommentInput from '../../components/comment/CommentInput';
import CommentList from '../../components/comment/CommentList';
import GoodButton from '../../components/post/GoodButton';
import { AsyncStatus } from '../../utils/constants';

function PostRead() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [asyncStatus, setAsyncStatus] = useState(AsyncStatus.IDLE);

  const post = usePostStore(state=>state.post);
  const setPost = usePostStore(state=>state.setPost);
  const setComments = usePostStore(state=>state.setComments);

  const isLogin = useAuthStore(state=>state.isLogin);
  const isWriter = useAuthStore(state=>state.isWriter);

  const vComment = useComment();

  const pno = parseInt(params.get('pno'));

  useEffect(() => {
    if (isNaN(pno)) {
      navigate("/");
      return; 
    }  

    setAsyncStatus(AsyncStatus.LOADING)
    async function fetch() {
      try {
        const {data} = await read(pno);
        const {comments, ...postWithoutComments} = data;
        setPost(postWithoutComments);
        setComments(comments);
        setAsyncStatus(AsyncStatus.SUCCESS);
      } catch(err) {
        setAsyncStatus(AsyncStatus.FAIL);
        console.log(err);
      }
    }
    fetch();
  }, [pno]);

  const deletePost = ()=>erase(pno).then(()=>navigate("/")).catch(res=>console.log(res));

  if(asyncStatus===AsyncStatus.IDLE || asyncStatus===AsyncStatus.LOADING)  return <LoadingSpinner />
  if(asyncStatus===AsyncStatus.FAIL) return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>

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
          isWriter(post.writer) &&  <GoodButton pno={pno} initialGoodCnt={post.goodCnt}>좋아요</GoodButton>
        }
      </div>

      <div style={{minHeight:"600px", backgroundColor:'#eee'}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />

      {
        isWriter(post.writer) &&
        <div className='mt-3 mb-3'>
          <Button variant="success" onClick={()=>navigate(`/post/update?pno=${pno}`)} className="me-3">변경으로</Button>
          <Button variant="danger" onClick={deletePost}>삭제하기</Button>
        </div>
      }

      <div className='mt-3 mb-3'>
        { isLogin() && <CommentInput pno={pno} {...vComment} /> }
        <CommentList />
      </div>
    </>
  )
}

export default PostRead