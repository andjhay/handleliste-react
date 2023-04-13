import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

function SearchDropdown({ data, searchInput, addToList }) {
  if (searchInput.length >= 3)
    return (
      <ListGroup id="dropdown-search" className="position-absolute bg-secondary w-75 m-auto">
        {data?.length > 0 ? (
          data?.map((product, index) => (
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
