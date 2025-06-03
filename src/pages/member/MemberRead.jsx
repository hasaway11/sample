import { useEffect, useState } from "react";
import ProfileField from "../../components/member/ProfileField";
import usePhoto from "../../hooks/usePhoto";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { changeProfile, read } from "../../utils/memberApi";
import { useNavigate } from "react-router-dom";
import useMemberStore from "../../stores/memberStore";
import { Alert } from "react-bootstrap";

function MemberRead() {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isFail, setFail] = useState(false);

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
    
    setLoading(true);
    async function fetch() {
      try {
        const response = await read();
        setMember(response.data);
        vProfile.setPhotoUrl(response.data.profile);
      } catch(err) {
        setFail(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const doChangeProfile=async()=>{
    if(vProfile.value===null)
      return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('profile', vProfile.value);
      const response = await changeProfile(formData);
      setMember(response.data);
    } catch(err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  }
  
  if(isFail) 
    return <Alert variant='danger'>서버가 응답하지 않습니다</Alert>
  if(loading || !member) return <LoadingSpinner />

  return (
    <div>
      <table className='table table-border'>
        <tbody>
          <tr>
            <td colSpan={2}>
              <ProfileField name='photo' label='사진' alt='미리보기' {...vProfile} />
              <button className='btn btn-primary' onClick={doChangeProfile} disabled={vProfile.value===null}>{isSubmitting ? "프사 변경 중..." : "프사 변경"}</button>
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