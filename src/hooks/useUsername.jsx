import { useState } from "react";
import {idAvailable} from '../utils/memberApi'

const pattern =  /^[0-9a-z]{6,10}$/;

function useUsername(availableCheck=false) {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
  
    const onChange = (e) =>setValue(e.target.value);
    
    const onBlur = async() => {
      setMessage('');
      const testResult = pattern.test(value);
      if (!testResult) {
        setMessage('아이디는 소문자와 숫자 6~10자입니다');
        return false;
      } 
      if (availableCheck) {
        try {
          await idAvailable(value);
          return true;
        } catch (err) {
          setMessage('사용할 수 없는 아이디입니다');
          console.log(err);
          return false;
        }
      } 
      return true;
    };
  
    return { value, message, onChange, onBlur };
}

export default useUsername