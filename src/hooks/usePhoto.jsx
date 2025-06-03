import  { useState } from 'react'

function usePhoto() {
  const [value, setValue] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const onChange = (e)=>{
    const file = e.target.files[0];
    setValue(file);

    if(file) {
      const reader = new FileReader();
      reader.onload = ()=>setPhotoUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoUrl(null);
    }
  };

  return {value, photoUrl, onChange, setPhotoUrl};
}


export default usePhoto