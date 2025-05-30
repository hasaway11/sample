import { useNavigate } from "react-router-dom";
import { useState } from "react";

import BlockButton from "../../component/common/BlockButton";
import FormField from "../../component/member/FormField";
import ProfileField from "../../component/member/ProfileField";
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
    // 중복 클릭 방지 등 UX 향상
    if (isSubmitting) 
      return;
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
      <FormField label='아이디' name='username' field={vUsername} />
      <FormField label='이메일' name='email' field={vEmail} />
      <FormField label='비밀번호' name='password' type='password' field={vPassword} />
      <FormField label='비밀번호 확인' name='confirm-password' type='password' field={vConfirmPassword} />
      <BlockButton label={isSubmitting ? "가입 처리 중..." : "회원 가입"} onClick={doSignup} styleName='primary' />
    </>
  )
}

export default MemberSignup