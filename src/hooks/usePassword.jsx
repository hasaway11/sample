import { useState } from "react";

const pattern =  /^[0-9a-zA-Z]{6,10}$/;

function usePassword() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const onChange = (e) => setValue(e.target.value);
  
  const onBlur = () => {
    setMessage('');
    if (pattern.test(value)) 
      return true;
    setMessage('비밀번호는 영숫자 6~10자입니다');
    return false;
  };

  const reset = ()=>setValue('');

  return {value, message, onBlur, onChange, reset};
}

export default usePassword