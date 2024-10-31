import { useEffect, useState } from "react";
const useGet = (url,relode) => {
  
  const [data, setData] = useState({loading:true,data:[]});
  useEffect(() => {
    async function xyz() {
      setData(Object.assign({},data,{loading:true}));
      const res = await axios.get(url);
      setData({data:res.data,loading:false});
    }
    xyz();
  }, [url,relode]);

  return data;
};

export default useGet;
