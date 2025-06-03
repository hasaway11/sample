import { useState } from "react";
import { Alert } from "react-bootstrap";

import TextField from "../../components/common/TextField";
import useEmail from "../../hooks/useEmail";
import BlockButton from "../../components/common/BlockButton";
import {findUsername} from '../../utils/memberApi';
import { AsyncStatus } from "../../utils/constants";

function MemberFindUsername() {
  const [asyncStatus, setAsyncStatus] = useState(AsyncStatus.IDLE);
  const [username, setUsername] = useState('');
  const vEmail = useEmail();

  const init=()=>{
    setUsername("");
    setAsyncStatus(AsyncStatus.IDLE);
  }

  const doFindUsername=async ()=>{
    init();
    
    if(asyncStatus===AsyncStatus.SUBMITTING) return;
    setAsyncStatus(AsyncStatus.SUBMITTING);

    if (!vEmail.onBlur()) {
      setAsyncStatus(AsyncStatus.IDLE);
      return;
    }

    try {
      const response = await findUsername(vEmail.value);
      setUsername(response.data);
      setAsyncStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      setAsyncStatus(AsyncStatus.FAIL);
      console.log(err);
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
      {asyncStatus===AsyncStatus.FAIL && <Alert variant='danger'>아이디를 찾지 못했습니다</Alert>}
      <TextField label='이메일' value={vEmail.value} message={vEmail.message} onBlur={onBlur} onChange={vEmail.onChange} />
      <BlockButton label={asyncStatus===AsyncStatus.SUBMITTING ? "찾는 중..." : "아이디 찾기"} onClick={doFindUsername} styleName='dark' disabled={asyncStatus===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberFindUsername