import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdTrash } from "react-icons/io";
import { MdSettingsBackupRestore } from "react-icons/md";
import ListItem from "./ListItem";

const List = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", price: 10.99, checked: false },
    { id: 2, name: "Item 2", price: 5.99, checked: false },
  ]);
  const [deletedItemList, setDeletedItemList] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");

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
        // <section>
        //   <p>Deleted items</p>
        //   <ul className="list">
        //     {deletedItemList.map((item) => (
        //       <li className="item" key={item.id}>
        //         <label>{item.name}</label>
        //         <input
        //           type="checkbox"
        //           checked={item.checked}
        //           onChange={() => handleCheck(item.id)}
        //           style={{ visibility: "hidden" }}
        //         ></input>
        //         <MdSettingsBackupRestore
        //           className="icon"
        //           role="button"
        //           onClick={() => handleRestore(item.id)}
        //         />
        //       </li>
        //     ))}
        //   </ul>
        // </section>
        <p>There aren´t deleted items</p>
      )}
    </>
  );
};

export default List;
