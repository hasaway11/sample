import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

import usePostStore from '../../stores/postStore';
import useAuthStore from '../../stores/authStore';
import useComment from '../../hooks/useComment';
import { read } from '../../utils/postApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import CommentInput from '../../components/comment/CommentInput';
import CommentList from '../../components/comment/CommentList';

function PostRead() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pno = params.get('pno');
  const [loading, setLoading] = useState(false);
  
  if(!pno)
    navigate("/");

  const {post, comments, setPost, setComments} = usePostStore();
  const {principal} = useAuthStore();
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

  const deletePost = ()=>{}

  if(loading) return <LoadingSpinner />
  if(!post) return null;

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
        {/* {
          (principal!=null && principal.username===post.writer) &&
          <GoodButton pno={post.bno} initialGoodCnt={post.goodCnt} />
        } */}
      </div>
      
      <div style={{minHeight:"600px", backgroundColor:'#eee'}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
      
      {
        (principal!=null && principal.username===post.writer) &&
        <div className='mt-3 mb-3'>
          <Button variant="success" onClick={()=>navigate(`/board/update?bno=${post.pno}`)} className="me-3">변경으로</Button>
          <Button variant="danger" onClick={deletePost}>삭제하기</Button>
        </div>
      }

      <div className='mt-3 mb-3'>
        { principal!=null && <CommentInput pno={pno} field={vComment} /> }
        <CommentList loginId={principal && principal.username} comments={comments} onRemove={vComment.remove} />
      </div>
    </>
  )
}

export default PostRead