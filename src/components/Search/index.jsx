import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import SearchDropdown from "../SearchDropdown";

/**
 * Search component
 * @param {Array} data - The array of data used for searching
 * @param {Function} addToList - The function that adds an item to the list
 * @param {String} searchInput - The current search input value
 * @param {Function} setSearchInput - The function that sets the search input value
 * @returns {JSX.Element} - The rendered search component
 */
function Search({ data, addToList, searchInput, setSearchInput }) {

  /**
   * Event handler for search
   * @param {Object} event - The event from input
   */
  function onChange(event) {
    if (event.currentTarget.value === "") {
      event.currentTarget.value = null;
    }
    setSearchInput(event.currentTarget.value);
    console.log(event.currentTarget.value);
  }

  return (
    <Container>
      <div className="d-flex flex-row justify-content-center">
        <Form.Control
          id="search-box"
          className="w-auto flex-grow-1"
          onChange={onChange}
          value={searchInput}
          placeholder="Skriv in søk eller vare her (min 3 bokstaver for søk)"
          aria-label="Search"
        />
        {searchInput.length > 0 ? (
          <button onClick={() => addToList({ name: searchInput })} className="mx-1 btn btn-secondary text-nowrap">
            Legg til
          </button>
        ) : (
          ""
        )}
      </div>

      <SearchDropdown data={data} searchInput={searchInput} addToList={addToList} />
    </Container>
  );
}

export default Search;
