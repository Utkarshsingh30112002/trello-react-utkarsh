import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../components/customHooks/useGet";
import { HStack, Grid, Spinner } from "@chakra-ui/react";
import { toast } from "react-toastify";

import List from '../components/singleBoardPage/List';
import {addListInBoardUrl,allListInBoardUrl,archiveListUrl} from "../utility/apiUrl";
import EditableCard from "../components/singleBoardPage/EditableCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBoard } from "../redux/slices/boardSlice";

const SingleBoard = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { id } = useParams();
  const url = allListInBoardUrl(id);
  useEffect(()=>{
    dispatch(fetchSingleBoard(url))
  },[])
  const { data, loading,error } = useSelector(state=>state.singleBoard)
  const [value, setValue] = useState("");

  if(error){
    navigate(`/${error}`)
  }
  async function addList() {
    const postUrl = addListInBoardUrl(value, id);
    try {
      await axios.post(postUrl);
      toast.success("List Created SuccessFully");
      setValue("");
      dispatch(fetchSingleBoard(url))
    } catch (error) {
      console.error("Error creating list:", error);
    }
  }
  async function archiveList(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this List?"
    );
    if (!confirm) return;
    const archiveUrl = archiveListUrl(id);
    await axios.put(archiveUrl);
    toast.success("List Deleted SuccessFully");
    dispatch(fetchSingleBoard(url))
  }

  return (
    <Grid
      bg="blue.400"
      h="100vh"
      alignItems="start"
      overflowX="auto"
      overflow="auto"
    >
      <HStack mx="10px">
        {loading ? (
          <Spinner />
        ) : (
          data.map((curr, i) => (
            <List curr={curr} key={i} archiveList={archiveList} />
          ))
        )}
        <EditableCard value={value} addList={addList} setValue={setValue} />
      </HStack>
    </Grid>
  );
};

export default SingleBoard;
