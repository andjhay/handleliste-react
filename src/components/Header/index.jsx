import React from "react";
import Search from "../Search";

function Header({ data, addToList, searchInput, setSearchInput, listItems }) {
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
      <h4 className="text-center p-1 ">{totalItems} Ting </h4>
      {totalCost > 0 ? <h6 className="text-center p-1 ">Estimert {totalCost.toFixed(2)} kr </h6> : ""}
      
    </header>
  );
}

export default Header;
