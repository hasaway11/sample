import { useState } from "react";

const pattern =  /^[0-9a-zA-Z]{6,10}$/;

function usePassword() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const change = e=>setValue(e.target.value);

  const check=()=>{
    setMessage('');
    if(pattern.test(value))
      return true;
    setMessage('비밀번호는 영숫자 6~10자입니다');
    return false;
  }

  return {value, message, check, change};
}

export default usePassword