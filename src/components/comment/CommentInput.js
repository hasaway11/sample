import React from 'react';
import { Button, Form } from 'react-bootstrap'

const CommentInput=React.memo(({pno, value, change, check, message, write})=>{
  const onWrite=()=>write(pno);

  return (
    <>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>댓글 작성:</Form.Label>
        <Form.Control as="textarea" rows={5} style={{resize: 'none'}} placeholder={message} onChange={change} value={value} onBlur={check} />
      </Form.Group>
      <div style={{display:'flex', justifyContent:'right'}} >
        <Button variant='primary' onClick={onWrite}>작성하기</Button>
      </div>
      <hr />
    </>
  )
});

export default CommentInput