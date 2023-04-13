import React, { useState } from "react";
import useApi from "./hooks/useApi";
import { baseUrl } from "./utils/api/api";
import "./styles.css";
import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListCard from "./components/ListCard";
import * as storage from "./utils/handlers/storage.js";

function App() {
  let storedItems = storage.load("listItems");
  if (storedItems === null) {
    storedItems = [];
  }

  const [searchInput, setSearchInput] = useState("");
  let searchUrl = baseUrl + `/?size=5&search=` + searchInput;
  const { data, isError } = useApi(searchUrl);
  const [listItems, setListItems] = useState(storedItems);

  if (isError) {
    return <h1 className="text-center my-3">Error Loading Products Contact Admin</h1>;
  }

  /**
   * Adds a product to listItems.
   *
   * @param {Object} product - The product object to add.
   */
  function addToList(product) {
    const listItemIndex = listItems.findIndex((item) => item.name === product.name);
    if (listItemIndex !== -1) {
      let newListItemData = [...listItems];
      newListItemData[listItemIndex].quantity += 1;
      setListItems(newListItemData);
      setSearchInput("");
      storage.save("listItems", newListItemData);
    } else {
      setListItems([...listItems, { ...product, quantity: 1, checked: false }]);
      setSearchInput("");
      storage.save("listItems", [...listItems, { ...product, quantity: 1, checked: false }]);
    }
  }

  /**
   * Removes a product from listItems.
   *
   * @param {Object} product - The product object to remove.
   */
  function removeFromList(product) {
    let newListItemData = [...listItems];
    const listItemIndex = newListItemData.findIndex((item) => item.name === product.name);
    if (listItemIndex !== -1) {
      const quantity = newListItemData[listItemIndex].quantity;
      if (quantity > 1) {
        newListItemData[listItemIndex].quantity -= 1;
      } else {
        storage.remove(newListItemData[listItemIndex].name);
        newListItemData.splice(listItemIndex, 1);
      }
      setListItems(newListItemData);
      storage.save("listItems", newListItemData);
    }
  }

  /**
   * Clears listItems and the local storage.
   */
  function clearList() {
    setListItems([]);
    storage.remove("listItems");
  }

  /**
   * Clears listItems that are checked.
   */
  function clearChecked() {
    let newListItemData = [];
    newListItemData = listItems.filter((item) => item.checked === false);
    setListItems(newListItemData);
    storage.save("listItems", newListItemData);
  }

  return (
    <>
      <Header
        data={data}
        addToList={addToList}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        listItems={listItems}
      />
      <main className="d-flex flex-column flex-grow-1">
        <div className="container-fluid">
          <div className="row g-1 row-cols-1 row-cols-md-2 row-cols-xl-3 ">
            {listItems?.map((product, index) => (
              <ListCard
                key={index}
                product={product}
                listItems={listItems}
                addToList={addToList}
                removeFromList={removeFromList}
                setListItems={setListItems}
              />
            ))}
          </div>
        </div>
        {listItems.length > 0 ? (
          <>
            <span className="container-fluid text-black-50">* estimert men varier fra butikk til butikk.</span>
            <div className="container text-center">
              <button onClick={() => clearList()} className="mx-2 my-1 btn btn-secondary">
                Fjern alle produkter
              </button>
              <button onClick={() => clearChecked()} className="mx-2 my-1 btn btn-secondary">
                Fjern markerte produkter
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
