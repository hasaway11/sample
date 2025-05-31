import  { useCallback, useMemo, useState } from 'react'

function usePhoto() {
  const [value, setValue] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const change = useCallback((e)=>{
    const file = e.target.files[0];
    setValue(file);

    if(file) {
      const reader = new FileReader();
      reader.onload = ()=>setPhotoUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoUrl(null);
    }
  }, [value]);

  return useMemo(()=>({value, photoUrl, change, setPhotoUrl}), [value, photoUrl, change, setPhotoUrl]);
}


export default usePhoto