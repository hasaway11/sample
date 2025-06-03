import { useNavigate } from 'react-router-dom';
import usePassword from '../../hooks/usePassword';
import {checkPassword} from '../../utils/memberApi';
import { useEffect, useState } from 'react';
import useMemberStore from '../../stores/memberStore';
import { Alert } from 'react-bootstrap';
import TextField from '../../components/common/TextField';
import BlockButton from '../../components/common/BlockButton';

function MemberCheckPassword() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isFail, setFail] = useState(false);
  const navigate = useNavigate();
  const isPasswordVerified = useMemberStore(state=>state.isPasswordVerified);
  const verifyPassword = useMemberStore(state=>state.verifyPassword);
  const vPassword = usePassword();

  useEffect(()=>{
    if (isPasswordVerified)
      navigate("/member/read");
  }, [isPasswordVerified]);

  const doCheckPassword=async ()=>{
    if (!(vPassword.onBlur())) 
      return;

    setSubmitting(true); 
    setFail(false);

    try {
      await checkPassword(vPassword.value);
      verifyPassword();
      // 컴포넌트 렌더 중 동기적으로 실행되기 때문에 리렌더링 루프나 경고가 발생 -> useEffect로 이동
      // navigate("/member/read");
    } catch(err) {
      if(err.status===409) 
        setFail(true);
      console.log(err);
    } finally {
      setSubmitting(false); 
    }
  }

  return (
    <div>
      {isFail &&  <Alert variant='danger'>비밀번호를 확인하지 못했습니다</Alert>}
      <TextField type='password' label='비밀번호' name='password' {...vPassword} />
      <BlockButton label={isSubmitting ? "비밀번호 확인 중..." : "확 인"} onClick={doCheckPassword} styleName='dark' disabled={isSubmitting}/>
    </div>
  )
}

export default MemberCheckPassword