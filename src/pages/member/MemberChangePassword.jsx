import { useState } from 'react';
import BlockButton from '../../components/common/BlockButton';
import TextField from '../../components/common/TextField';
import useConfirmPassword from '../../hooks/useConfirmPassword';
import usePassword from '../../hooks/usePassword';
import {changePassword} from '../../utils/memberApi';
import { Alert } from 'react-bootstrap';


function MemberChangePassword() {
  // 처리중, 처리성공, 처리실패 상태 저장
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isFail, setFail] = useState(false);

  // 커스텀 훅 객체 선언
  const vCurrentPassword = usePassword();
  const vNewPassword = usePassword();
  const vConfirmPassword = useConfirmPassword(vNewPassword);

  const doChangePassword=async ()=>{
    const r1 = vCurrentPassword.check();
    const r2 = vNewPassword.check();
    const r3 = vConfirmPassword.check();
    if (!(r1 && r2 && r3)) 
      return;

    setSubmitting(true); 
    setSuccess(false);
    setFail(false);

    try {
      const requestForm = {currentPassword:vCurrentPassword.value, newPassword:vNewPassword.value};
      await changePassword(requestForm);
      setSuccess(true);
      vCurrentPassword.reset();
      vNewPassword.reset();
      vConfirmPassword.reset();
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
      {isSuccess &&  <Alert variant='success'>비밀번호를 변경했습니다</Alert>}
      {isFail &&  <Alert variant='danger'>비밀번호를 변경에 실패했습니다</Alert>}
      <TextField type='password' label='기존 비밀번호' name='current-password' field={vCurrentPassword} />
      <TextField type='password' label='새 비밀번호' name='new-password' field={vNewPassword} />
      <TextField type='password' label='비밀번호 확인' name='confirm-password' field={vConfirmPassword} />
      <BlockButton label={isSubmitting ? "비밀번호 변경 중..." : "변 경"} onClick={doChangePassword} styleName='dark' disabled={isSubmitting}/>
    </div>
  )
}

export default MemberChangePassword