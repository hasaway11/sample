import { useNavigate, useSearchParams } from "react-router-dom";
import usePostStore from "../../stores/postStore";
import useAuthStore from "../../stores/authStore";
import { useEffect } from "react";
import TextField from "../../components/common/TextField";
import BlockButton from "../../components/common/BlockButton";


function PostUpdate() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pno = params.get('pno');
  const [loading, setLoading] = useState(false);
  
  if(!pno)
    navigate("/");

  const {post, comments, setPost, setComments} = usePostStore();
  const {principal} = useAuthStore();

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      try {
        const {data} = await read(pno);
        const {title, content} = data;
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

  const doUpdate=()=>{}

  return (
    <>
      <TextField label='제목' name='title' field={vTitle} />
      <ReactQuill theme="snow" name="content" modules={modules}  value={content} onChange={(value)=>setContent(value)} style={{ height: '600px' }}/>
      <BlockButton label="변 경" onClick={doUpdate} styleName='primary' />
    </>
  )
}

export default PostUpdate