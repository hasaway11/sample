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

function MemberSignup() {
  const [isSubmitting, setSubmitting] = useState(false);

  const vProfile = usePhoto();
  const vUsername = useUsername(true);
  const vPassword = usePassword();
  const vConfirmPassword = useConfirmPassword(vPassword);
  const vEmail = useEmail();

  const navigate = useNavigate();

  const doSignup=async()=>{
    setSubmitting(true);

    try {
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
      
      await signup(formData);
      navigate('/member/login');
    } catch(err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <ProfileField name='photo' label='사진' onChange={vProfile.change} photoUrl={vProfile.photoUrl} alt='미리보기' />
      <TextField label='아이디' name='username' value={vUsername.value} message={vUsername.message} onChange={vUsername.change} onBlur={vUsername.check} />
      <TextField label='이메일' name='email' value={vEmail.value} message={vEmail.message} onChange={vEmail.change} onBlur={vEmail.check} />
      <TextField label='비밀번호' name='password' type='password' value={vPassword.value} message={vPassword.message} onChange={vPassword.change} onBlur={vPassword.check} />
      <TextField label='비밀번호 확인' name='confirm-password' type='password' value={vConfirmPassword.value} message={vConfirmPassword.message} onChange={vConfirmPassword.change} onBlur={vConfirmPassword.check} />
      <BlockButton label={isSubmitting ? "가입 처리 중..." : "회원 가입"} onClick={doSignup} styleName='primary' disabled={isSubmitting}/>
    </>
  )
}

export default MemberSignup