import { useState } from "react";
import { Alert } from "react-bootstrap";

import TextField from "../../components/common/TextField";
import useEmail from "../../hooks/useEmail";
import BlockButton from "../../components/common/BlockButton";
import {findUsername} from '../../utils/memberApi';

function MemberFindUsername() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [isFail, setFail] = useState(false);
  const vEmail = useEmail();

  const init=()=>{
    setUsername("");
    setFail(false);
  }

  const doFindUsername=async ()=>{
    init();
    
    if (isSubmitting) return; 
    if (!vEmail.onBlur()) return;

    setSubmitting(true); 
    try {
      const response = await findUsername(vEmail.value);
      setUsername(response.data);
    } catch(err) {
      if(err.status===409) 
        setFail(true);
      else 
        console.log(err);
    } finally {
      setSubmitting(false);
    }
  }

  const onBlur = ()=>{
    init();
    vEmail.onBlur();
  }

  return (
    <div>
      <h1>아이디 찾기</h1>
      {username &&  <Alert variant='success'>당신의 아이디 : {username}</Alert>}
      {isFail && <Alert variant='danger'>아이디를 찾지 못했습니다</Alert>}
      <TextField label='이메일' value={vEmail.value} message={vEmail.message} onBlur={onBlur} onChange={vEmail.onChange} />
      <BlockButton label={isSubmitting ? "찾는 중..." : "아이디 찾기"} onClick={doFindUsername} styleName='dark' disabled={isSubmitting} />
    </div>
  )
}

export default MemberFindUsername