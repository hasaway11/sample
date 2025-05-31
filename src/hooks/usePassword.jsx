import { useCallback, useMemo, useState } from "react";

const pattern =  /^[0-9a-zA-Z]{6,10}$/;

function usePassword() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const change = useCallback((e) => setValue(e.target.value), []);
  
  const check = useCallback(() => {
    setMessage('');
    if (pattern.test(value)) return true;
    setMessage('비밀번호는 영숫자 6~10자입니다');
    return false;
  }, [value]);


  return useMemo(()=>({value, message, check, change}), [value, message, check, change]);
}

export default usePassword