import React, { useState, useEffect } from "react";
import Search from "../Search";

function Header({ data, addToList, searchInput, setSearchInput, listItems }) {
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setCheckedItems(listItems.filter((item) => item.checked));
  }, [listItems]);

  let totalItems = 0;
  let totalCost = 0;

  listItems?.forEach((item) => {
    totalItems = totalItems + item.quantity;
    console.log(item.current_price);
    if (item.current_price !== undefined) totalCost = totalCost + item.current_price * item.quantity;
  });

  return (
    <header>
      <h1 className="text-center p-2">Handleliste</h1>
      <Search data={data} addToList={addToList} searchInput={searchInput} setSearchInput={setSearchInput} />
      {listItems.length > 0 ? <h4 className="text-center p-1">{listItems.length} type vare </h4> : ""}
      {listItems.length > 0 ? (
        <h6 className={checkedItems.length === listItems.length && listItems.length !== 0 ? "text-center p-1 text-success fw-bold" : "text-center p-1"}>
          {checkedItems.length} / {listItems.length}{" "}
          {checkedItems.length === listItems.length && listItems.length !== 0 ? "Gratulere du er ferdig å handle!" : "krysset av"}
        </h6>
      ) : (
        ""
      )}
      {totalCost > 0 ? (
        <h6 className="text-center p-1 ">
          Estimert {totalCost.toFixed(2)} kr for totalt {totalItems} varer{" "}
        </h6>
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;
