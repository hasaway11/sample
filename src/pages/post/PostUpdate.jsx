import 'react-quill-new/dist/quill.snow.css';
import './PostWrite.css';

import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import { useEffect, useState } from "react";
import TextField from "../../components/common/TextField";
import BlockButton from "../../components/common/BlockButton";
import { add, read, update } from "../../utils/postApi";
import useInput from "../../hooks/useInput";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ReactQuill from "react-quill-new";


function PostUpdate() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pno = params.get('pno');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [content, setContent] = useState(null);
  const vTitle = useInput();
  const principal = useAuthStore(state=>state.username);

  if(!pno)
    navigate("/");

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      try {
        const {data} = await read(pno);
        const {title, content} = data;
        vTitle.setValue(title);
        setContent(content);
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [pno]);

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


  if(loading || !content) return <LoadingSpinner />

  return (
    <>
      <TextField label='제목' name='title' field={vTitle} />
      <ReactQuill theme="snow" name="content" modules={modules}  value={content} onChange={(value)=>setContent(value)}/>
      <BlockButton label={isSubmitting ? "변경 중..." : "변 경"} onClick={doUpdate} styleName='primary' />
    </>
  )
}

export default PostUpdate