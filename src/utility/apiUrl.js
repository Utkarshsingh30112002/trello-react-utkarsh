const apikey=import.meta.env.VITE_API_KEY;
const apiToken=import.meta.env.VITE_API_TOKEN

export function boardsGetUrl(){
    return `https://api.trello.com/1/members/me/boards?key=${apikey}&token=${apiToken}`
}
export function boardAddUrl(name){
    return `https://api.trello.com/1/boards/?name=${name}&key=${apikey}&token=${apiToken}`
}
export function addCheckListUrl(name,cardId){
    return `https://api.trello.com/1/checklists?idCard=${cardId}&key=${apikey}&token=${apiToken}&name=${name}`;
}
export function delCheckListUrl(checklistId){
    return `https://api.trello.com/1/checklists/${checklistId}?key=${apikey}&token=${apiToken}`;
}
export function allListInBoardUrl(id){
    return `https://api.trello.com/1/boards/${id}/lists?key=${apikey}&token=${apiToken}`;
}
export function addListInBoardUrl(value,id){
    return `https://api.trello.com/1/lists?name=${value}&idBoard=${id}&key=${apikey}&token=${apiToken}`;
}
export function archiveListUrl(id){
    return `https://api.trello.com/1/lists/${id}/closed?key=${apikey}&token=${apiToken}&value=true`
}
export function allCardsInListUrl(id){
    return `https://api.trello.com/1/lists/${id}/cards?key=${apikey}&token=${apiToken}`
}
export function addCardUrl(name,id){
    return `https://api.trello.com/1/cards?idList=${id}&key=${apikey}&token=${apiToken}&name=${name}`
}
export function getACardUrl(cardId){
    return `https://api.trello.com/1/cards/${cardId}?key=${apikey}&token=${apiToken}`
}
export function delACardUrl(id){
    return `https://api.trello.com/1/cards/${id}?key=${apikey}&token=${apiToken}`
}
export function getAllCheckListUrl(id){
    return `https://api.trello.com/1/checklists/${id}?key=${apikey}&token=${apiToken}`
}
export function toggleCheckUrl(cardId,checkItemId,state){
    return `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${apikey}&token=${apiToken}&state=${state}`
}
export function addCheckItemUrl(id,name){
    return `https://api.trello.com/1/checklists/${id}/checkItems?name=${name}&key=${apikey}&token=${apiToken}`
}
export function delCheckItemUrl(id,itemId){
    return `https://api.trello.com/1/checklists/${id}/checkItems/${itemId}?key=${apikey}&token=${apiToken}`
}