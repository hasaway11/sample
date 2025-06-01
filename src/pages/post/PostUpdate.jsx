import 'react-quill-new/dist/quill.snow.css';
import './PostWrite.css';

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from "../../components/common/TextField";
import BlockButton from "../../components/common/BlockButton";
import { update } from "../../utils/postApi";
import useInput from "../../hooks/useInput";
import ReactQuill from "react-quill-new";
import usePostStore from '../../stores/postStore';


function PostUpdate() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pno = params.get('pno');
  // const [loading, setLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  // const username = useAuthStore(state=>state.username);
  const post = usePostStore(state=>state.post);
  const [content, setContent] = useState(null);
  const vTitle = useInput();

  if(!pno)
    navigate("/");

  useEffect(() => {
    vTitle.setValue(post.title);
    setContent(post.content);
  }, []);

  const doUpdate =async()=>{
    if (isSubmitting) 
      return;
    setSubmitting(true);
    try {
      if (!(vTitle.check())) 
        return;
      const requestForm = {title:vTitle.value, content:content, pno:pno};
      await update(requestForm);
      navigate(`/post/read?pno=${pno}`);
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


  if(!content) return;

  return (
    <>
      <TextField label='제목' name='title' field={vTitle} />
      <ReactQuill theme="snow" name="content" modules={modules}  value={content} onChange={(value)=>setContent(value)}/>
      <BlockButton label={isSubmitting ? "변경 중..." : "변 경"} onClick={doUpdate} styleName='primary' />
    </>
  )
}

export default PostUpdate