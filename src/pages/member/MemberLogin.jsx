import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import useUsername from '../../hooks/useUsername';
import usePassword from '../../hooks/usePassword';
import TextField from '../../components/common/TextField';
import BlockButton from '../../components/common/BlockButton';
import {login} from '../../utils/authApi'
import useAuthStore from '../../stores/authStore';
import { AsyncStatus } from '../../utils/constants';
import { Alert } from 'react-bootstrap';

function MemberLogin() {
  const [asyncStatus, setAsyncStatus] = useState(AsyncStatus.IDLE);
  const [status, setStatus] = useState(0);

  const vUsername = useUsername();
  const vPassword = usePassword();
  const setUsername = useAuthStore(state=>state.setUsername);
  const navigate = useNavigate();

  const doLogin=async ()=>{
    if(asyncStatus===AsyncStatus.SUBMITTING) return;
    setAsyncStatus(AsyncStatus.SUBMITTING);

    const r1 = await vUsername.onBlur();
    const r2 = vPassword.onBlur();
    if(!(r1 && r2)) {
      setAsyncStatus(AsyncStatus.IDLE);
      return;
    }

    const requestForm = {username:vUsername.value, password:vPassword.value};
    try {
      const response = await login(requestForm)
      setUsername(response.data.username);
      setAsyncStatus(AsyncStatus.IDLE);
      navigate("/");
      return;
    } catch(err) {
      setAsyncStatus(AsyncStatus.FAIL);
      setStatus(err.status);
      console.log(err);
    } 
  };

  return (
    <div>
      <h1>로그인</h1>
      {(asyncStatus===AsyncStatus.FAIL && status===401) && <Alert variant='danger'>로그인 실패 : 이메일 또는 비밀번호를 다시 확인하세요.</Alert>}
      {(asyncStatus===AsyncStatus.FAIL && status===403) && <Alert variant='danger'>로그인 실패 : 확인되지 않은 계정입니다. 이메일을 확인하세요.</Alert>}
      <TextField label='아이디' name="username" {...vUsername} />
      <TextField type='password' label='비밀번호' name="password" {...vPassword}/>
      <BlockButton label={asyncStatus===AsyncStatus.SUBMITTING ? "로그인 중..." : "로그인"} onClick={doLogin} styleName='primary' disabled={asyncStatus===AsyncStatus.SUBMITTING} />
    </div>
  )
}

export default MemberLogin