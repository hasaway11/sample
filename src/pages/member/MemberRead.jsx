import { useEffect } from "react";
import ProfileField from "../../component/member/ProfileField";
import useProfile from "../../hooks/usePhoto";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../component/common/LoadingSpinner";

function MemberRead() {
  const [member, loading, error] = useFetch(`/members/read`);
  const profile = useProfile();

  useEffect(()=>{
    profile.setPhotoUrl(member.photo)
  }, [member]);

  if(loading) return <LoadingSpinner />
  if(error) return <div>{error.message}</div>;
  if(!member) return null;

  return (
    <div>
      <table className='table table-border'>
        <tr>
          <td colSpan={2}>
            <ProfileField name='photo' label='사진' onChange={profile.change} photoUrl={profile.photoUrl} alt='미리보기' />
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
          <td>`${member.joinday} (${member.days}일)`</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button className='btn btn-primary'>비밀번호 변경</button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default MemberRead