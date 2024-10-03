import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdTrash } from "react-icons/io";
import { MdSettingsBackupRestore } from "react-icons/md";
import ListItem from "./ListItem";
import { useEffect } from "react";

const List = () => {  
  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState([]);
  const [deletedItemList, setDeletedItemList] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchItems = async () => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Did not receive expected data')
        const listItems = await response.json();
        setItems(listItems);
        console.log(listItems);
        setFetchError(null)
      } catch (err){
        console.log(err.stack); 
        setFetchError(err.message)
      }finally{
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000)
  }, []);


  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            checked: !item.checked,
          }
        : item
    );
    setItems(listItems);
    localStorage.setItem("shoppingList", JSON.stringify(listItems));
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    const deletedItem = items.find((item) => item.id === id);
    if (deletedItem) {
      const updatedDeletedItems = [...deletedItemList, deletedItem];
      setDeletedItemList(updatedDeletedItems);
      localStorage.setItem("deletedItems", JSON.stringify(updatedDeletedItems));
    }
    setItems(listItems);
    localStorage.setItem("shoppingList", JSON.stringify(listItems));
  };

  const handleRestore = (id) => {
    const deletedItems = deletedItemList.filter((item) => item.id !== id);
    const restoredItem = deletedItemList.find((item) => item.id === id);
    if (restoredItem) {
      const updatedItemList = [...items, restoredItem];
      setItems(updatedItemList);
      localStorage.setItem("shoppingList", JSON.stringify(updatedItemList));
    }
    setDeletedItemList(deletedItems);
    localStorage.setItem("deletedItems", JSON.stringify(deletedItems));
  };
  const handleNameChange = (e) => {
    setNewItemName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setNewItemPrice(e.target.value);
  };

  const handleAddItem = () => {
    if (newItemName.trim() && newItemPrice.trim()) {
      const newItemObject = {
        id: items.length + 1,
        name: newItemName,
        price: parseFloat(newItemPrice),
        checked: false,
      };
      const updatedItemList = [...items, newItemObject];
      setItems(updatedItemList);
      localStorage.setItem("shoppingList", JSON.stringify(updatedItemList));
      setNewItemName("");
      setNewItemPrice("");
    }
  };

  return (
    <>
      <h1>Shopping List</h1>
      {isLoading && <p>Loading Items...</p>}
      {fetchError && <p style={{color:'red'}}>`Error ${fetchError}`</p>}
      {!fetchError && !isLoading &&
      <>
        <section style={{ display: "flex", justifyContent: "space-around" }}>
          <input
            type="text"
            onChange={handleNameChange}
            value={newItemName}
            placeholder="Add new item"
          ></input>
          <input
            type="number"
            onChange={handlePriceChange}
            value={newItemPrice}
            placeholder="Price"
          />
          <label
            onClick={handleAddItem}
            style={{ cursor: "pointer", display: "flex" }}
          >
            <CiCirclePlus className="icon" />
            Add item
          </label>
        </section>
        {items.length ? (
          <ul>
            {items.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                handleAction={handleDelete}
                handleCheck={handleCheck}
                checkboxHidden={false}
                icon={IoMdTrash}
              />
            ))}
          </ul>
        ) : (
          <p>The list is empty</p>
        )}
        {deletedItemList.length > 0 ? (
          <>
            <p>Deleted items</p>
            <ul>
              {deletedItemList.map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  handleAction={handleRestore}
                  handleCheck={handleCheck}
                  icon={MdSettingsBackupRestore}
                />
              ))}
            </ul>
          </>
        ) : (
          <p>There aren´t deleted items</p>
        )}
      </>
      }
    </>
  );
};

export default List;
