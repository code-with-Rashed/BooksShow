import { ToastContainer, toast } from "react-toastify";

const _readBookList = "readBookListIds";
const _wishBookList = "wishBookListIds";

const addItemInLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getItemFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data) || [];
}

const bookMarkAsRead = (id) => {
    const readBookListIds = getItemFromLocalStorage(_readBookList);
    if (!readBookListIds.includes(id)) {
        const newItem = [...readBookListIds, id]
        addItemInLocalStorage(_readBookList, newItem);
        toast.success("The Book mark as read succesfully.");
    } else {
        toast.warn("This Book is already mark as read.");
    }
}
const wishMarkAsRead = (id) => {
    const wishBookListIds = getItemFromLocalStorage(_wishBookList);
    if (!wishBookListIds.includes(id)) {
        const newItem = [...wishBookListIds, id]
        addItemInLocalStorage(_wishBookList, newItem);
        toast.success("The Book add wishlist succesfully.");
    } else {
        toast.warn("This Book is already exist in wishlist.");
    }
}
const getReadBookList = () => {
    return getItemFromLocalStorage(_readBookList);
}
const removeReadBookList = (id) => {
    const readBookListIds = getItemFromLocalStorage(_readBookList);
    const updatedReadBookListIds = readBookListIds.filter(savedIds => savedIds !== id);
    addItemInLocalStorage(_readBookList, updatedReadBookListIds);
    toast.success("The Book remove from readlist succesfully.");
}
const getWishBookList = () => {
    return getItemFromLocalStorage(_wishBookList);
}
const removeWishBookList = (id) => {
    const wishBookListIds = getItemFromLocalStorage(_wishBookList);
    const updatedWishBookListIds = wishBookListIds.filter(savedIds => savedIds !== id);
    addItemInLocalStorage(_wishBookList, updatedWishBookListIds);
    toast.success("The Book remove from wishlist succesfully.");
}
function Bookdb() {
    return <ToastContainer />
}
export { bookMarkAsRead, wishMarkAsRead, getReadBookList, getWishBookList, removeReadBookList, removeWishBookList, Bookdb }