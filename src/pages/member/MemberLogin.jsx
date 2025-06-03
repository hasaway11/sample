import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import useUsername from '../../hooks/useUsername';
import usePassword from '../../hooks/usePassword';
import TextField from '../../components/common/TextField';
import BlockButton from '../../components/common/BlockButton';
import {login} from '../../utils/authApi'
import useAuthStore from '../../stores/authStore';

function MemberLogin() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isFail, setFail] = useState(false);

  const vUsername = useUsername();
  const vPassword = usePassword();
  const setUsername = useAuthStore(state=>state.setUsername);
  const navigate = useNavigate();

  const doLogin=async ()=>{
    if(isSubmitting) return;
    setSubmitting(true); 

    const r1 = await vUsername.onBlur();
    const r2 = vPassword.onBlur();
    if(!(r1 && r2))
      return;

    const requestForm = {username:vUsername.value, password:vPassword.value};
    try {
      const response = await login(requestForm)
      setUsername(response.data.username);
      // navigate()가 맨 마지막이므로 return이 필수는 아니다
      navigate("/");
      return;
    } catch(err) {
      setFail(true);
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <TextField label='아이디' name="username" {...vUsername} />
      <TextField type='password' label='비밀번호' name="password" {...vPassword}/>
      {isFail && <span style={{color:'red'}}>이메일 또는 비밀번호를 다시 확인하세요.</span>}
      <BlockButton label={isSubmitting ? "로그인 중..." : "로그인"} onClick={doLogin} styleName='primary' disabled={isSubmitting} />
    </div>
  )
}

export default MemberLogin