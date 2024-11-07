import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  IconButton,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Editable } from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import { CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";
import {
  addCheckItemUrl,
  delCheckItemUrl,
  getAllCheckListUrl,
  toggleCheckUrl,
} from "../../utility/apiUrl";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckList } from "../../redux/slices/checkListSlice";

const SingleChecklist = ({ id, delCheckList, cardId }) => {
  const dispatch=useDispatch()
  const url = getAllCheckListUrl(id);
  const {data,loading:checkListLoading} = useSelector(state=>state.checkList)//useGet(url, relodeData);
  const checklist=data[id]||{}
  const loading = checkListLoading[id];
  const title = loading ? "" : checklist.name || "";
  const items = loading ? [] : checklist.checkItems || [];
  const [name, setName] = useState("");

  const [checkedItems, setCheckedItems] = useState([]);
  useEffect(()=>{
      dispatch(fetchCheckList({id,url}))
    },[])
  useEffect(() => {
    if (!loading) {
      setCheckedItems(
        items.map((item) => ({
          ...item,
          checked: item.state == "complete" ? true : false,
        }))
      );
    }
  }, [items]);

  const toggleCheck = async (index, checkItemId) => {
    let state = "";
    const updatedItems = checkedItems.map((item, idx) => {
      if (idx === index) {
        if (item.checked) state = "incomplete";
        else state = "complete";
        return { ...item, checked: !item.checked };
      } else return item;
    });
    let updateUrl = toggleCheckUrl(cardId, checkItemId, state);
    await axios.put(updateUrl);
    toast.success(`Item marked as ${state}`);
    setCheckedItems(updatedItems);
  };

  const progress =
    (checkedItems.filter((item) => item.checked).length / checkedItems.length) *
    100;
  async function addCheckItem() {
    if (!name.trim()) {
      setName("");
      return;
    }
    const createUrl = addCheckItemUrl(id, name);
    await axios.post(createUrl);
    toast.success("CheckItem created SuccessFully");
    dispatch(fetchCheckList({id,url}))
    setName("");
  }

  async function delCheckItem(itemId) {
    const confirm = window.confirm(
      "Are you sure you want to delete this CheckItem?"
    );
    if (!confirm) return;
    let delUrl = delCheckItemUrl(id, itemId);
    await axios.delete(delUrl);
    toast.success("CheckItem Deleted SuccessFully");
    dispatch(fetchCheckList({id,url}))
  }

  return (
    <Box w="100%" p={4} bg="gray.700" rounded="md" color="white" my="10px">
      <ProgressRoot
        value={progress || 0}
        colorPalette="gray"
        mb="4"
        rounded="sm"
        variant="subtle"
        size="xs"
      >
        <HStack>
          <Heading size="md" mb="4">
            {title}
          </Heading>
          <Spacer />{" "}
          <IconButton
            size="xs"
            bg="gray.700"
            onClick={() => delCheckList(checklist.id)}
          >
            <FaTrash />
          </IconButton>
        </HStack> {Math.floor(progress)}%
        <ProgressBar maxWidth="450px" />
      </ProgressRoot>

      <Stack spacing="3">
        {loading ? (
          <Spinner />
        ) : (
          checkedItems.map((item, index) => (
            <Box
              display="flex"
              w={"100%"}
              gap="20px"
              alignItems="center"
              key={item.id}
            >
              <Checkbox
                checked={item.checked}
                onChange={() => toggleCheck(index, item.id)}
                colorScheme="green"
              ></Checkbox>

              <Text as={item.checked ? "s" : "span"}>{item.name}</Text>
              <Box flexGrow={1}></Box>
              <IconButton
                size="xs"
                bg="gray.700"
                onClick={() => delCheckItem(item.id)}
              >
                <CiTrash />
              </IconButton>
            </Box>
          ))
        )}
        <Editable.Root
          color="white"
          onValueChange={(e) => setName(e.value)}
          onValueCommit={addCheckItem}
          value={name}
          submitMode="enter"
        >
          <Editable.Preview />
          <Editable.Input />
          <Editable.Control>
            <Editable.EditTrigger asChild>
              <IconButton
                variant="ghost"
                size="xs"
                color="white"
                bg="#22272B"
                px="10px"
              >
                <FaPlus /> Add CheckItem
              </IconButton>
            </Editable.EditTrigger>

            <Editable.CancelTrigger asChild>
              <IconButton variant="outline" size="xs" color="white">
                <LuX />
              </IconButton>
            </Editable.CancelTrigger>
            <Editable.SubmitTrigger asChild>
              <IconButton variant="outline" size="xs" color="white">
                <LuCheck />
              </IconButton>
            </Editable.SubmitTrigger>
          </Editable.Control>
        </Editable.Root>
      </Stack>
    </Box>
  );
};

export default SingleChecklist;
