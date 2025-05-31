import { Button } from 'react-bootstrap'
import usePostStore from '../../stores/postStore'
import useComment from '../../hooks/useComment'
import React from 'react';

const CommentList = React.memo(({loginId})=>{
	const comments = usePostStore(state=>state.comments);
	const {remove} = useComment();

  return (
		<>
		{
			comments.map(comment=>{
				return (
					<div key={comment.cno}>
						<div className='upper'style={{display:"flex", justifyContent: "space-between"}}>
							<div>
								<strong>{comment.writer}</strong>&nbsp;&nbsp;
								{
									(comment.writer===loginId) && <Button variant="outline-danger" size="sm" onClick={()=>remove(comment.cno, comment.pno)}>삭제</Button>
								}			
							</div>
						<div>{comment.writeTime}</div>
						</div>
						<div className='lower'>{comment.content}</div>
						<hr />
					</div>	
				)			
			})
		}
		</>
  )
});

export default CommentList