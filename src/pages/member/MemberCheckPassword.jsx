import { Navigate, useNavigate } from 'react-router-dom';
import usePassword from '../../hooks/usePassword';
import {checkPassword} from '../../utils/memberApi';

function MemberCheckPassword() {
  // 처리중, 처리성공, 처리실패 상태 저장
  const [isSubmitting, setSubmitting] = useState(false);
  const [isFail, setFail] = useState(false);
  const navigate = useNavigate();
  const isPasswordVerified = useAuthStore(state=>state.isPasswordVerified);
  const verifyPassword = useAuthStore(state=>state.verifyPassword);

  if (isPasswordVerified) 
    return <Navigate to="/member/read" />;

  useEffect(()=>{
    if (isPasswordVerified)
      navigate("/member/read");
  }, [isPasswordVerified]);

  // 커스텀 훅 객체 선언
  const vPassword = usePassword();

  const doCheckPassword=async ()=>{
    if (!(vPassword.check())) 
      return;

    setSubmitting(true); 
    setFail(false);

    try {
      const requestForm = {password:vPassword.value};
      await checkPassword(requestForm);
      verifyPassword();
      // 컴포넌트 렌더 중 동기적으로 실행되기 때문에 리렌더링 루프나 경고가 발생 -> useEffect로 이동
      // navigate("/member/read");
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
      {isFail &&  <Alert variant='danger'>비밀번호를 확인하지 못했습니다</Alert>}
      <TextField type='password' label='비밀번호' name='password' field={vPassword} />
      <BlockButton label={isSubmitting ? "비밀번호 확인 중..." : "변 경"} onClick={doCheckPassword} styleName='dark' disabled={isSubmitting}/>
    </div>
  )
}

export default MemberCheckPassword