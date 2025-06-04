import { useState } from "react";
import { Alert } from "react-bootstrap";

import TextField from "../../components/common/TextField";
import BlockButton from "../../components/common/BlockButton";
import { AsyncStatus } from "../../utils/constants";
import useUsername from "../../hooks/useUsername";

function MemberResetPassword() {
  const [asyncStatus, setAsyncStatus] = useState(AsyncStatus.IDLE);
  const vUsername = useUsername();


  const doResetUsername=async ()=>{
    if(asyncStatus===AsyncStatus.SUBMITTING) return;
    setAsyncStatus(AsyncStatus.SUBMITTING);

    if (!vUsername.onBlur()) {
      setAsyncStatus(AsyncStatus.IDLE);
      return;
    }

    try {
      const response = await resetUsername(vUsername.value);
      setAsyncStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      setAsyncStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  }

  return (
    <div>
      <h1>비밀번호 찾기</h1>
      <p>&#x2714; 비밀번호의 경우 암호화 저장되어 분실 시 찾아드릴 수 없는 정보 입니다.</p>
      <p>&#x2714; 본인 확인을 통해 비밀번호를 재설정 하실 수 있습니다.</p>
      {asyncStatus===AsyncStatus.SUCCESS &&  <Alert variant='success'>임시비밀번호를 가입 이메일로 보냈습니다</Alert>}
      {asyncStatus===AsyncStatus.FAIL && <Alert variant='danger'>사용자 정보를 확인하지 못했습니다</Alert>}
      <TextField label='아이디' name='username' {...vUsername} />
      <BlockButton label={asyncStatus===AsyncStatus.SUBMITTING ? "찾는 중..." : "비밀번호 찾기"} onClick={doResetUsername} styleName='danger' disabled={asyncStatus===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberResetPassword