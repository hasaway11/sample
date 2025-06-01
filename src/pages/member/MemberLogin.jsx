import { useCallback, useState } from 'react'
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
  const setUsername = useAuthStore(state=>state.setUsername);
  const navigate = useNavigate();

  const doLogin=useCallback(async ()=>{
    const r1 = await vUsername.check();
    const r2 = vPassword.check();
    if(!(r1 && r2))
      return;
    const requestForm = {username:vUsername.value, password:vPassword.value};
    setSubmitting(true); 

    try {
      const response = await login(requestForm)
      setUsername(response.data.username);
      navigate("/");
    } catch(err) {
      setLoginFail(true);
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  }, [vUsername, vPassword]);

  return (
    <div>
      <TextField label='아이디' name="username" field={vUsername} />
      <TextField type='password' label='비밀번호' name="password" field={vPassword} />
      {isLoginFail && <span style={{color:'red'}}>이메일 또는 비밀번호를 다시 확인하세요.</span>}
      <BlockButton label={isSubmitting ? "로그인 중..." : "로그인"} onClick={doLogin} styleName='primary' />
    </div>
  )
}

export default MemberLogin