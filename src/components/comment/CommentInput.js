import { Button, Form } from 'react-bootstrap'

function CommentInput({pno, field, onUpdate}) {
  const {value, change, check, message, write } = field;
  return (
    <>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>댓글 작성:</Form.Label>
        <Form.Control as="textarea" rows={5} style={{resize: 'none'}} placeholder={message} onChange={change} value={value} onBlur={check} />
      </Form.Group>
      <div style={{display:'flex', justifyContent:'right'}} >
        <Button variant='primary' onClick={()=>write(pno, onUpdate)}>작성하기</Button>
      </div>
      <hr />
    </>
  )
}

export default CommentInput