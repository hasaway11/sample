import { useState } from "react";
import FormField from "../../component/member/FormField";
import useEmail from "../../hooks/useEmail";
import BlockButton from "../../component/common/BlockButton";
import { Alert } from "react-bootstrap";
import {findUsername} from '../../utils/memberApi';

function MemberFindUsername() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const vEmail = useEmail();

  const doFindUsername=async ()=>{
    setUsername("");
    setMessage("");
    
    if (!vEmail.check()) return;
    if (isSubmitting) return;

    setSubmitting(true); 
    try {
      const response = await findUsername(vEmail.value);
      setUsername(response.data);
    } catch(err) {
      if(err.status===409) 
        setMessage("사용자를 찾지 못했습니다");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>아이디 찾기</h1>
      <FormField label='이메일' field={vEmail} />
      {username &&  <Alert variant='success'>당신의 아이디 : {username}</Alert>}
      {message && <Alert variant='danger'>{message}</Alert>}
      <BlockButton label={isSubmitting ? "찾는 중..." : "아이디 찾기"} onClick={doFindUsername} style='success' />
    </div>
  )
}

export default MemberFindUsername