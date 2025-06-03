import { useState } from 'react';
import BlockButton from '../../components/common/BlockButton';
import TextField from '../../components/common/TextField';
import useConfirmPassword from '../../hooks/useConfirmPassword';
import usePassword from '../../hooks/usePassword';
import {changePassword} from '../../utils/memberApi';
import { Alert } from 'react-bootstrap';
import { AsyncStatus } from '../../utils/constants';


function MemberChangePassword() {
  const [asyncStatus, setAsyncStatus] = useState(AsyncStatus.IDLE);

  const vCurrentPassword = usePassword();
  const vNewPassword = usePassword();
  const vConfirmPassword = useConfirmPassword(vNewPassword);

  const doChangePassword=async ()=>{
    if(asyncStatus===AsyncStatus.SUBMITTING) return;
    setAsyncStatus(AsyncStatus.SUBMITTING);

    const r1 = vCurrentPassword.onBlur();
    const r2 = vNewPassword.onBlur();
    const r3 = vConfirmPassword.onBlur();
    if (!(r1 && r2 && r3)) {
      setAsyncStatus(AsyncStatus.IDLE);
      return;
    }

    try {
      const requestForm = {currentPassword:vCurrentPassword.value, newPassword:vNewPassword.value};
      await changePassword(requestForm);
      setAsyncStatus(AsyncStatus.SUCCESS);
      vCurrentPassword.reset();
      vNewPassword.reset();
      vConfirmPassword.reset();
    } catch(err) {
      setAsyncStatus(AsyncStatus.FAIL);
      console.log(err);
    }
  }

  return (
    <div>
      <h1>비밀번호 변경</h1>
      {asyncStatus===AsyncStatus.SUCCESS &&  <Alert variant='success'>비밀번호를 변경했습니다</Alert>}
      {asyncStatus===AsyncStatus.FAIL &&  <Alert variant='danger'>비밀번호를 변경하지 못했습니다</Alert>}
      <TextField type='password' label='기존 비밀번호' name='current-password' {...vCurrentPassword} />
      <TextField type='password' label='새 비밀번호' name='new-password' {...vNewPassword} />
      <TextField type='password' label='비밀번호 확인' name='confirm-password' {...vConfirmPassword} />
      <BlockButton label={asyncStatus===AsyncStatus.SUBMITTING ? "비밀번호 변경 중..." : "변 경"} onClick={doChangePassword} styleName='dark' disabled={asyncStatus===AsyncStatus.SUBMITTING}/>
    </div>
  )
}

export default MemberChangePassword