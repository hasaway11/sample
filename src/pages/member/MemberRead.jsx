import { useEffect, useState } from "react";
import ProfileField from "../../components/member/ProfileField";
import usePhoto from "../../hooks/usePhoto";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { read } from "../../utils/memberApi";
import { useNavigate } from "react-router-dom";

function MemberRead() {
  const [loading, setLoading] = useState(false);
  const vProfile = usePhoto();
  const [member, setMember] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true);
    async function fetch() {
      try {
        const response = await read();
        const {profile, ...rest} = response.data;
        vProfile.setPhotoUrl(profile);
        setMember(rest);
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if(loading || !member) return <LoadingSpinner />

  return (
    <div>
      <table className='table table-border'>
        <tbody>
          <tr>
            <td colSpan={2}>
              <ProfileField name='photo' label='사진' onChange={vProfile.change} photoUrl={vProfile.photoUrl} alt='미리보기' />
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
              <button className='btn btn-primary' onClick={()=>navigate('/member/change-password')}>비밀번호 변경</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MemberRead