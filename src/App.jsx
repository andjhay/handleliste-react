import React, { useState } from "react";
import useApi from "./hooks/useApi";
import { baseUrl } from "./utils/api/api";
import "./styles.css";
import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListCard from "./components/ListCard";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, isError } = useApi(baseUrl + `/?search=` + searchInput);
  const [listItems, setListItems] = useState([]);

  function addToList(product) {
    const listItemIndex = listItems.findIndex((item) => item.name === product.name);
    if (listItemIndex !== -1) {
      const newListItemData = [...listItems];
      newListItemData[listItemIndex].quantity += 1;
      setListItems(newListItemData);
    } else {
      setListItems([...listItems, { ...product, quantity: 1 }]);
      setSearchInput("");
    }
  }

  function removeFromList(product) {
    const newListItemData = [...listItems];
    const listItemIndex = newListItemData.findIndex((item) => item.name === product.name);
    if (listItemIndex !== -1) {
      const quantity = newListItemData[listItemIndex].quantity;
      if (quantity > 1) {
        newListItemData[listItemIndex].quantity -= 1;
      } else {
        newListItemData.splice(listItemIndex, 1);
      }
      setListItems(newListItemData);
    }
  }

  function clearList() {
    setListItems([]);
  }

  console.log(listItems);

  const groupedItems = listItems.reduce((groups, item) => {
    if (!groups[item.venue]) {
      groups[item.venue] = [];
    }
    groups[item.venue].push(item);
    return groups;
  }, {});

  // Log the result
  console.log(groupedItems);

  return (
    <>
      <Header
        data={data}
        addToList={addToList}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        listItems={listItems}
        setListItems={setListItems}
      />
      <main className="d-flex flex-column flex-grow-1">
        <div className="m-4 row row-cols-1 row-cols-md-2 row-cols-xl-3 g-1">
          {listItems?.map((product, index) => (
            <ListCard key={index} product={product} addToList={addToList} removeFromList={removeFromList} />
          ))}
        </div>
        {listItems.length > 0 ? (
          <button onClick={() => clearList()} className="w-auto my-3 m-auto btn btn-secondary">
            Tøm listen
          </button>
        ) : (
          ""
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
