import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function MemberEmailVerified() {
  const [params] = useSearchParams();
  const result = params.get('result');

  return (
     <div style={{ padding: 20 }}>
      {result === 'success' ? (
        <>
          <h2>✅ 이메일 인증이 완료되었습니다!</h2>
          <Link to="/member/login">로그인으로</Link>
        </>
      ) : (
        <h2>❌ 인증에 실패했습니다. 이미 인증되었거나 잘못된 링크입니다.</h2>
      )}
    </div>
  )
}

export default MemberEmailVerified