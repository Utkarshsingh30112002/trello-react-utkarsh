import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import SingleChecklist from "../components/common/SingleChecklist";
import PopupForm from "../components/common/PopupForm";
import { useState } from "react";
import { toast } from "react-toastify";
import { addCheckListUrl, delCheckListUrl } from "../utility/apiUrl";

const CardPage = ({ open, setOpen, card, relode, setRelode, loading }) => {
  const [relodeData, setRelodeData] = useState(true);

  async function addCheckList(name) {
    if (!name) return;
    await axios.post(addCheckListUrl(name, card.id));
    toast.success("CheckList Added SuccessFully");
    setRelode((prev) => !prev);
  }
  async function delCheckList(checklistId) {
    const confirm = window.confirm(
      "Are you sure you want to delete this CheckList?"
    );
    if (!confirm) return;
    const delUrl = delCheckListUrl(checklistId);
    await axios.delete(delUrl);
    toast.success("CheckList Deleted SuccessFully");
    setRelode((prev) => !prev);
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
              {loading ? (
                <Spinner />
              ) : (
                card.idChecklists.map((currId, i) => {
                  return (
                    <SingleChecklist
                      key={currId}
                      id={currId}
                      relode={relode}
                      setRelode={setRelode}
                      delCheckList={delCheckList}
                      relodeData={relodeData}
                      setRelodeData={setRelodeData}
                      cardId={card.id}
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
