import React from "react";
import Search from "../Search";

function Header({ data, addToList, searchInput, setSearchInput }) {
  return (
    <header>
      <h1 className="text-center p-2">Handleliste</h1>
      <Search data={data} addToList={addToList} searchInput={searchInput} setSearchInput={setSearchInput} />
    </header>
  );
}

export default Header;
