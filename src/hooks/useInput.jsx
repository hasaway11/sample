import  { useState } from 'react'

function useInput() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const onChange = e=>setValue(e.target.value);

  const onBlur=()=>{
    setMessage('');
    if(value!=='')
      return true;
    setMessage('필수 입력입니다');
    return false;
  };

  return {value, message, onBlur, onChange, setValue};
}

export default useInput