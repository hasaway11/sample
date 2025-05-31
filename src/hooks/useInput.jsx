import  { useCallback, useMemo, useState } from 'react'

function useInput() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const change = useCallback(e=>setValue(e.target.value), []);

  const check=useCallback(()=>{
    setMessage('');
    if(value!=='')
      return true;
    setMessage('필수 입력입니다');
    return false;
  }, [value]);

  return useMemo(()=>({value, message, check, change, setValue}), [value, message, check, change, setValue]);
}

export default useInput