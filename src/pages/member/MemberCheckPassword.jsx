import { useNavigate } from 'react-router-dom';
import usePassword from '../../hooks/usePassword';
import {checkPassword} from '../../utils/memberApi';
import { useEffect, useState } from 'react';
import useMemberStore from '../../stores/memberStore';
import { Alert } from 'react-bootstrap';
import TextField from '../../components/common/TextField';
import BlockButton from '../../components/common/BlockButton';
import { AsyncStatus } from '../../utils/constants';

function MemberCheckPassword() {
  const [asyncStatus, setAsyncStatus] = useState(AsyncStatus.IDLE);
  const navigate = useNavigate();
  const isPasswordVerified = useMemberStore(state=>state.isPasswordVerified);
  const verifyPassword = useMemberStore(state=>state.verifyPassword);
  const vPassword = usePassword();

  useEffect(()=>{
    if (isPasswordVerified)
      navigate("/member/read");
  }, [isPasswordVerified]);

  const doCheckPassword=async ()=>{
    if(asyncStatus===AsyncStatus.SUBMITTING) return;
    setAsyncStatus(AsyncStatus.SUBMITTING);

    if (!(vPassword.onBlur())) {
      setAsyncStatus(AsyncStatus.IDLE);
      return;
    }
    
    try {
      await checkPassword(vPassword.value);
      verifyPassword();
      setAsyncStatus(AsyncStatus.SUCCESS);
      navigate("/member/read");
      return;
    } catch(err) {
      setAsyncStatus(AsyncStatus.FAIL);
      console.log(err);
    } 
  }

  return (
    <div>
      {asyncStatus===AsyncStatus.FAIL &&  <Alert variant='danger'>비밀번호를 확인하지 못했습니다</Alert>}
      <TextField type='password' label='비밀번호' name='password' {...vPassword} />
      <BlockButton label={asyncStatus===AsyncStatus.SUBMITTING ? "비밀번호 확인 중..." : "확 인"} onClick={doCheckPassword} styleName='dark' disabled={asyncStatus===AsyncStatus.SUBMITTING}/>
    </div>
  )
}

export default MemberCheckPassword