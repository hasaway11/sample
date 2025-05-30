import { useState } from "react";

function usePhoto() {
  const [value, setValue] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const change = (e)=>{
    const file = e.target.files[0];
    setValue(file);

    if(file) {
      const reader = new FileReader();
      reader.onload = ()=>setPhotoUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoUrl(null);
    }
  }

  return {value, photoUrl, change, setPhotoUrl};
}

export default usePhoto