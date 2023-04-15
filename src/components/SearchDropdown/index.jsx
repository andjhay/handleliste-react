import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

/**
 * SearchDropdown component displays a dropdown list of search results if API fails returns an error.
 *
 * @param {Array} data - The data to display in the dropdown list.
 * @param {string} searchInput - The search query string.
 * @param {function} addToList - The function to add a selected item to a list.
 * @param {boolean} isLoading - status on data loading.
 * @param {boolean} isError - A flag indicating whether an error occurred.
 */
function SearchDropdown({ data, searchInput, addToList, isLoading, isError }) {
  if (isError) {
    return (
      <ListGroup id="dropdown-search" className="position-absolute bg-secondary w-75 m-auto">
        <ListGroup.Item>!Error Fetching Products!</ListGroup.Item>
      </ListGroup>
    );
  }
  if (searchInput.length > 0 && isLoading) {
    return (
      <ListGroup id="dropdown-search" className="position-absolute bg-secondary w-75 m-auto">
        <ListGroup.Item>Loading Products</ListGroup.Item>
      </ListGroup>
    );
  }
  if (searchInput.length >= 3 && data.length === 0) {
    return (
      <ListGroup id="dropdown-search" className="position-absolute bg-secondary w-75 m-auto">
        <ListGroup.Item>No Products match the search</ListGroup.Item>
      </ListGroup>
    );
  }
  if (searchInput.length >= 3 && data[0].name.toLowerCase().includes(searchInput.toLowerCase()) && isLoading === false)
    return (
      <ListGroup id="dropdown-search" className="position-absolute bg-secondary w-75 m-auto">
        {data.length > 0 ? (
          data.map((product, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-center py-1 px-0">
              <div className="mx-2">{product.name}</div>
              <div className="ms-auto">
                <button onClick={() => addToList(product)} className=" btn btn-secondary text-nowrap">
                  Legg til
                </button>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No Products match the search</ListGroup.Item>
        )}
      </ListGroup>
    );
}

export default SearchDropdown;
