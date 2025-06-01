import { useState } from "react";
import { Alert } from "react-bootstrap";

import TextField from "../../components/common/TextField";
import useEmail from "../../hooks/useEmail";
import BlockButton from "../../components/common/BlockButton";
import {findUsername} from '../../utils/memberApi';

function MemberFindUsername() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [foundUsername, setFoundUsername] = useState('');
  const [message, setMessage] = useState('');

  const vEmail = useEmail();

  const doFindUsername=async ()=>{
    setFoundUsername("");
    setMessage("");
    
    if (!vEmail.check()) return;
    if (isSubmitting) return;

    setSubmitting(true); 
    try {
      const response = await findUsername(vEmail.value);
      setFoundUsername(response.data);
    } catch(err) {
      if(err.status===409) 
        setMessage("사용자를 찾지 못했습니다");
    } finally {
      setSubmitting(false);
    }
  }

  const onBlur = ()=>{
    setFoundUsername("");
    setMessage("");
    vEmail.check();
  }

  return (
    <div>
      <h1>아이디 찾기</h1>
      <TextField label='이메일' value={vEmail.value} message={vEmail.message} onBlur={onBlur} onChange={vEmail.change} />
      {foundUsername &&  <Alert variant='success'>당신의 아이디 : {foundUsername}</Alert>}
      {message && <Alert variant='danger'>{message}</Alert>}
      <BlockButton label={isSubmitting ? "찾는 중..." : "아이디 찾기"} onClick={doFindUsername} styleName='dark' disabled={isSubmitting} />
    </div>
  )
}

export default MemberFindUsername