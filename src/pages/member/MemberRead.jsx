import { useEffect, useState } from "react";
import ProfileField from "../../components/member/ProfileField";
import usePhoto from "../../hooks/usePhoto";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { changeProfile, read } from "../../utils/memberApi";
import { useNavigate } from "react-router-dom";
import useMemberStore from "../../stores/memberStore";
import { Alert } from "react-bootstrap";
import { AsyncStatus } from "../../utils/constants";

function MemberRead() {
  const [loadingStatus, setLoadingStatus] = useState(AsyncStatus.IDLE);
  const [submitStatus, setSubmitStatus] = useState(AsyncStatus.IDLE);

  const member = useMemberStore(state=>state.member);
  const setMember = useMemberStore(state=>state.setMember);
  const isPasswordVerified = useMemberStore(state=>state.isPasswordVerified);
  const navigate = useNavigate();
  const vProfile = usePhoto();

  useEffect(()=>{
    if(!isPasswordVerified) {
      navigate("/member/check-password");
      return;
    }
    
    setLoadingStatus(AsyncStatus.LOADING);
    async function fetch() {
      try {
        const response = await read();
        setMember(response.data);
        vProfile.setPhotoUrl(response.data.profile);
        setLoadingStatus(AsyncStatus.SUCCESS);
      } catch(err) {
        setLoadingStatus(AsyncStatus.FAIL);
        console.log(err);
      } 
    };
    fetch();
  }, []);

  const doChangeProfile=async()=>{
    if(submitStatus===AsyncStatus.SUBMITTING) return;
    setSubmitStatus(AsyncStatus.SUBMITTING);

    if(vProfile.value===null)
      return;
    try {
      const formData = new FormData();
      formData.append('profile', vProfile.value);
      const response = await changeProfile(formData);
      setMember(response.data);
      setSubmitStatus(AsyncStatus.SUCCESS);
    } catch(err) {
      setSubmitStatus(AsyncStatus.FAIL);
      console.log(err);
    } 
  }
  
  if(loadingStatus===AsyncStatus.IDLE || loadingStatus===AsyncStatus.LOADING)  return <LoadingSpinner />
  if(loadingStatus===AsyncStatus.FAIL) return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>


  return (
    <div>
      <table className='table table-border'>
        <tbody>
          <tr>
            <td colSpan={2}>
              <ProfileField name='photo' label='사진' alt='미리보기' {...vProfile} />
              <button className='btn btn-primary' onClick={doChangeProfile} disabled={vProfile.value===null}>{submitStatus===AsyncStatus.SUBMITTING ? "프사 변경 중..." : "프사 변경"}</button>
            </td>
          </tr>
          <tr>
            <td>아이디</td>
            <td>{member.username}</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>{member.email}</td>
          </tr>
          <tr>
            <td>레벨</td>
            <td>{member.level}</td>
          </tr>
          <tr>
            <td>가입입</td>
            <td>{`${member.joinday} (${member.days}일)`}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button className='btn btn-success' onClick={()=>navigate('/member/change-password')}>비밀번호 변경으로</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MemberRead