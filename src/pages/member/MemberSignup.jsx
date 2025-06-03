import { useNavigate } from "react-router-dom";
import { useState } from "react";

import BlockButton from "../../components/common/BlockButton";
import TextField from "../../components/common/TextField";
import ProfileField from "../../components/member/ProfileField";
import useConfirmPassword from "../../hooks/useConfirmPassword";
import useEmail from "../../hooks/useEmail";
import usePassword from "../../hooks/usePassword";
import usePhoto from "../../hooks/usePhoto";
import useUsername from "../../hooks/useUsername";
import {signup} from '../../utils/memberApi';
import { Alert } from "react-bootstrap";
import { AsyncStatus } from "../../utils/constants";

function MemberSignup() {
  const [asyncStatus, setAsyncStatus] = useState(AsyncStatus.IDLE);
  const navigate = useNavigate();

  const vProfile = usePhoto();
  const vUsername = useUsername(true);
  const vPassword = usePassword();
  const vConfirmPassword = useConfirmPassword(vPassword);
  const vEmail = useEmail();

  const doSignup=async()=>{

    if(asyncStatus===AsyncStatus.SUBMITTING) return;
    setAsyncStatus(AsyncStatus.SUBMITTING);

    const r1 = await vUsername.onBlur();
    const r2 = vPassword.onBlur();
    const r3 = vConfirmPassword.onBlur();
    const r4 = vEmail.onBlur();
    if (!(r1 && r2 && r3 && r4)) {
      setAsyncStatus(AsyncStatus.IDLE);
      return;
    }
    const formData = new FormData();
    formData.append('username', vUsername.value);
    formData.append('password', vPassword.value);
    formData.append('email', vEmail.value);
    formData.append('profile', vProfile.value);
    try {
      await signup(formData);
      setAsyncStatus(AsyncStatus.SUCCESS);
      // navigate는 blocking하지 않는다
      navigate('/member/login');
      return;
    } catch(err) {
      setAsyncStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  }
  return (
    <>
      {asyncStatus===AsyncStatus.FAIL &&  <Alert variant='danger'>회원 가입에 실패했습니다</Alert>}
      <ProfileField name='photo' label='사진' alt='미리보기' {...vProfile} />
      <TextField label='아이디' name='username' {...vUsername} />
      <TextField label='이메일' name='email' {...vEmail} />
      <TextField type='password' label='비밀번호' name='password' {...vPassword} />
      <TextField type='password' label='비밀번호 확인' name='confirm-password' {...vConfirmPassword} />
      <BlockButton label={asyncStatus===AsyncStatus.SUBMITTING ? "가입 처리 중..." : "회원 가입"} onClick={doSignup} styleName='primary' disabled={asyncStatus===AsyncStatus.SUBMITTING}/>
    </>
  )
}

export default MemberSignup