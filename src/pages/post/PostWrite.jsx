import { useState } from 'react'
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/common/TextField';
import BlockButton from '../../components/common/BlockButton';
import {write} from '../../utils/memberApi';

function PostWrite() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const vTitle = useInput();
  const navigate = useNavigate();

  const doWrite =async()=>{
    if (isSubmitting) 
      return;
    setSubmitting(true);
    try {
      if (!(vTitle.check())) 
        return;
      const requestForm = {title:vTitle.value, content:content};
      const {data} = await write(requestForm);
      navigate(`/post/read?pno=${data.pno}`);
    } catch(err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  }

  const modules = {
    toolbar: {
      container: [['image'], [{ header: [1, 2, 3, 4, 5, false] }], ['bold', 'underline']]
    }
  };

  return (
    <>
      <TextField label='제목' name='title' field={vTitle} />
      <ReactQuill theme="snow" name="content" modules={modules}  value={content} onChange={(value)=>setContent(value)} style={{ height: '600px' }}/>
      <BlockButton label="글쓰기" onClick={doWrite} styleName='primary' />
    </>
  )
}

export default PostWrite