import React, { useState, useEffect } from "react";
import Search from "../Search";

/**
 * Header component
 * @param {Array} data - The list of available items to add to the shopping list
 * @param {Function} addToList - Function to add an item to the shopping list
 * @param {string} searchInput - The current value of the search input field
 * @param {Function} setSearchInput - Function to update the value of the search input field
 * @param {Array} listItems - The list of items in the shopping list
 * @param {boolean} isLoading - status on data loading.
 * @param {boolean} isError - A flag indicating whether an error occurred.
 */
function Header({ data, addToList, searchInput, setSearchInput, listItems, isLoading, isError }) {
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setCheckedItems(listItems.filter((item) => item.checked));
  }, [listItems]);

  let totalItems = 0;
  let totalCost = 0;

  listItems?.forEach((item) => {
    totalItems = totalItems + item.quantity;
    if (item.current_price !== undefined) totalCost = totalCost + item.current_price * item.quantity;
  });

  return (
    <header>
      <h1 className="text-center p-2">Handleliste</h1>
      <Search
        data={data}
        addToList={addToList}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        isLoading={isLoading}
        isError={isError}
      />
      {listItems.length > 0 ? (
        <h4 className="text-center p-1">
          {listItems.length} {listItems.length > 1 ? "typer varer" : "type vare"}{" "}
        </h4>
      ) : (
        ""
      )}
      {listItems.length > 0 ? (
        <h6
          className={
            checkedItems.length === listItems.length && listItems.length !== 0
              ? "text-center p-1 text-success fw-bold"
              : "text-center p-1"
          }
        >
          {checkedItems.length} / {listItems.length}{" "}
          {checkedItems.length === listItems.length && listItems.length !== 0
            ? "Gratulerer! Du er ferdig å handle!"
            : "Markert"}
        </h6>
      ) : (
        ""
      )}
      {totalCost > 0 ? (
        <h6 className="text-center p-1 ">
          Estimert {totalCost.toFixed(2)} kr for totalt {totalItems} {totalItems > 1 ? "varer" : "vare"}
        </h6>
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;
