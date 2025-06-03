import { useState } from "react";
import usePostStore from "../stores/postStore";
import {add, erase} from '../utils/commentApi'

function useComment() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const setComments = usePostStore(state=>state.setComments);

  const onChange = e=>setValue(e.target.value);

  const onBlur=()=>{
    setMessage('');
    if(value!=='')
      return true;
    setMessage('필수입력입니다');
    return false;
  }

  const write=async(pno)=>{
    const result = onBlur();
    if(!result) 
      return;
    const requestForm =  {pno: pno, content:value};
    try {
      const response = await add(requestForm);
      setValue('');
      setComments(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  const remove=async(cno, pno)=>{
    try {
      const response = await erase(cno, pno);
      setComments(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  return {value, message, onBlur, onChange, remove, write};
}

export default useComment