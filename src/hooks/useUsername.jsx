import { useState } from "react";
import {idAvailable} from '../utils/memberApi'

const pattern =  /^[0-9a-z]{6,10}$/;

function useUsername(availableCheck=false) {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
  
    const change = (e) =>setValue(e.target.value);
    
    const check = async() => {
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
          if(err.status===409)
            setMessage('사용중인 아이디입니다');
          else
            console.log(err);
          return false;
        }
      } 
      return true;
    };
  
    return { value, message, change, check };
}

export default useUsername