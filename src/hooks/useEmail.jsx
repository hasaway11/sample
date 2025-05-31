import { useCallback, useMemo, useState } from "react";

const pattern =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

function useEmail() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const change = useCallback(e=>setValue(e.target.value), []);

  const check= useCallback(()=>{
    setMessage('');
    if(pattern.test(value))
      return true;
    setMessage('이메일을 올바르게 입력해주세요');
    return false;
  });

  return useMemo(()=>({value, message, check, change}), [value, message, check, change]);
}

export default useEmail