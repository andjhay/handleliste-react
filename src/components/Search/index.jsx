import React from "react";
import SearchDropdown from "../SearchDropdown";

let timeoutId;

/**
 * Search component
 * @param {Array} data - The array of data used for searching
 * @param {Function} addToList - The function that adds an item to the list
 * @param {String} searchInput - The current search input value
 * @param {Function} setSearchInput - The function that sets the search input value
 * @param {boolean} isError - A flag indicating whether an error occurred.
 */
function Search({ data, addToList, searchInput, setSearchInput, isError }) {
  /**
   * Event handler for search with debounce
   * @param {Object} event - The event from input
   */
  function onChange(event) {
    let searchTerm = event.currentTarget.value;
    if (searchTerm === "") {
      clearTimeout(timeoutId);
      setSearchInput(searchTerm);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSearchInput(searchTerm);
      }, 900);
    }
  }

  return (
    <div className="">
      <div className="d-flex flex-row justify-content-center w-75 m-auto">
        <input
          id="search-box"
          className="form-control"
          onChange={onChange}
          placeholder="Søk eller legg inn egen vare"
          aria-label="Search"
        />
        {searchInput.length > 0 ? (
          <button onClick={() => addToList({ name: searchInput })} className=" btn btn-secondary text-nowrap">
            Legg til
          </button>
        ) : (
          ""
        )}
      </div>
      <SearchDropdown data={data} searchInput={searchInput} addToList={addToList} isError={isError} />
    </div>
  );
}

export default Search;
