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

function MemberSignup() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isFail, setFail] = useState(false);
  const navigate = useNavigate();

  const vProfile = usePhoto();
  const vUsername = useUsername(true);
  const vPassword = usePassword();
  const vConfirmPassword = useConfirmPassword(vPassword);
  const vEmail = useEmail();

  const doSignup=async()=>{
    if(isSubmitting) return;
    setSubmitting(true);

    const r1 = await vUsername.check();
    const r2 = vPassword.check();
    const r3 = vConfirmPassword.check();
    const r4 = vEmail.check();
    if (!(r1 && r2 && r3 && r4)) 
      return;

    const formData = new FormData();
    formData.append('username', vUsername.value);
    formData.append('password', vPassword.value);
    formData.append('email', vEmail.value);
    formData.append('profile', vProfile.value);

    try {
      await signup(formData);
      navigate('/member/login');
    } catch(err) {
      setFail(true);
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {isFail &&  <Alert variant='danger'>회원 가입에 실패했습니다</Alert>}
      <ProfileField name='photo' label='사진' alt='미리보기' {...vProfile} />
      <TextField label='아이디' name='username' {...vUsername} />
      <TextField label='이메일' name='email' {...vEmail} />
      <TextField label='비밀번호' name='password' {...vPassword} />
      <TextField label='비밀번호 확인' name='confirm-password' type='password' {...vConfirmPassword} />
      <BlockButton label={isSubmitting ? "가입 처리 중..." : "회원 가입"} onClick={doSignup} styleName='primary' disabled={isSubmitting}/>
    </>
  )
}

export default MemberSignup