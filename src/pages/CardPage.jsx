import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addCheckListUrl, delCheckListUrl, getACardUrl } from "../utility/apiUrl";
import SingleChecklist from "../components/common/SingleChecklist";
import PopupForm from "../components/common/PopupForm";
import { fetchACard } from "../redux/slices/cardSlice";
import { useDispatch, useSelector } from "react-redux";

const CardPage = ({
  open,
  setOpen,
  cardId
}) => {
  const getCardUrl = getACardUrl(cardId);
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchACard({url:getCardUrl,cardId}))
  },[])
  const {data,loading:loading}=useSelector(state=>state.card)
  const card=data[cardId]||{}


  async function addCheckList(name) {
    if (!name) return;
    await axios.post(addCheckListUrl(name, cardId));
    toast.success("CheckList Added SuccessFully");
    dispatch(fetchACard({url:getCardUrl,cardId}))
  }
  async function delCheckList(checklistId) {
    const confirm = window.confirm(
      "Are you sure you want to delete this CheckList?"
    );
    if (!confirm) return;
    const delUrl = delCheckListUrl(checklistId);
    await axios.delete(delUrl);
    toast.success("CheckList Deleted SuccessFully");
    dispatch(fetchACard({url:getCardUrl,cardId}))
    console.log('working')
  }
  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      trapFocus={false}
      closeOnOverlayClick={false}
      size="lg"
    >
      <DialogContent bg="#323940" color="#8d98a3">
        <DialogHeader>
          <DialogTitle>{card.name}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Grid templateColumns={"repeat(6,1fr)"} gap={2}>
            <GridItem colSpan={5}>
              {loading[cardId] ? (
                <Spinner />
              ) : (
                data[cardId]?.idChecklists.map((currId) => {
                  return (
                    <SingleChecklist
                      key={currId}
                      id={currId}
                      delCheckList={delCheckList}
                      cardId={cardId}
                    />
                  );
                })
              )}
            </GridItem>
            <GridItem>
              <PopupForm addBoard={addCheckList} title={"Create CheckList"} />
            </GridItem>
          </Grid>
        </DialogBody>
        <DialogCloseTrigger color="white" />
      </DialogContent>
    </DialogRoot>
  );
};
export default CardPage;
