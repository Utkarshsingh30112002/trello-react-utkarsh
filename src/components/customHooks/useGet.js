import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const useGet = (url, relode) => {
  const [data, setData] = useState({ loading: true, data: [] });
  const navigate = useNavigate();
  useEffect(() => {
    async function xyz() {
      setData(Object.assign({}, data, { loading: true }));
      try {
        const res = await axios.get(url);
        setData({ data: res.data, loading: false });
      } catch (error) {
        console.log(error.response.data);
        navigate("/NotFoundPage");
      }
    }
    xyz();
  }, [url, relode]);

  return data;
};

export default useGet;
