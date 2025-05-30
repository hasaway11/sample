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
  const [isLoginFail, setLoginFail] = useState(false);

  const vUsername = useUsername();
  const vPassword = usePassword();
  const {setPrincipal } = useAuthStore();
  const navigate = useNavigate();

  const doLogin=async ()=>{
    const r1 = vUsername.check();
    const r2 = vPassword.check();
    if(!(r1 && r2))
      return;

    const requestForm = {username:vUsername.value, password:vPassword.value};
    setSubmitting(true); 

    try {
      const response = await login(requestForm)
      setPrincipal(response.data.username);
      setSubmitting(false);
      navigate("/");
    } catch(err) {
      setLoginFail(true);
      console.log(err);
    } finally {
      setSubmitting(false);
    }    
  }

  return (
    <div>
      <TextField label='아이디' name="username" field={vUsername} />
      <TextField label='비밀번호' name="password" field={vPassword} />
      {isLoginFail && <span style={{color:'red'}}>이메일 또는 비밀번호를 다시 확인하세요.</span>}
      <BlockButton label={isSubmitting ? "로그인 중..." : "로그인"} onClick={doLogin} styleName='primary' />
    </div>
  )
}

export default MemberLogin