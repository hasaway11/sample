import  { useState } from 'react'

function useInput() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const change = e=>setValue(e.target.value);

  const check=()=>{
    setMessage('');
    if(value!=='')
      return true;
    setMessage('필수 입력입니다');
    return false;
  }

  return {value, message, check, change};
}

export default useInput