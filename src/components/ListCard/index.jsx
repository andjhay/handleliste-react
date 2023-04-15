import React, { useState, useEffect } from "react";
import * as storage from "../../utils/handlers/storage";

function ListCard({ product, listItems, addToList, removeFromList, setListItems }) {
  const [isChecked, setIsChecked] = useState(product.checked);

  /**
   * Updates checked items when item is removed from listItems
   */
  useEffect(() => {
    setIsChecked(product.checked);
  }, [product, listItems]);

  const handleCheckboxChange = (event) => {
    const newListItems = [...listItems];
    const listItemIndex = newListItems.findIndex((item) => item.name === product.name);
    newListItems[listItemIndex].checked = event.target.checked;
    setListItems(newListItems);
    storage.save("listItems", newListItems);
    setIsChecked(event.target.checked);
  };

  return (
    <div className="card col p-1 d-flex flex-row align-items-center">
      <input
        className="mx-2 form-check-input"
        type="checkbox"
        id={product.name}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div>
        <span className={isChecked ? "text-decoration-line-through" : "none"}>{product.name}</span> <br />
        <span className="fw-bold">{product.current_price ? product.current_price.toFixed(2) + " kr pr stk*" : ""}</span>
      </div>
      <div className="ms-auto">
        {product.image ? <img className="img-fluid" alt={product.name} src={product.image} /> : ""}
      </div>

      <button
        onClick={() => removeFromList(product)}
        className={
          product.image
            ? "mx-1 btn btn-width btn-secondary rounded-circle border border-2 border-dark"
            : "ms-auto mx-1 btn btn-width btn-secondary rounded-circle border border-2 border-dark"
        }
      >
        -
      </button>
      <span className="fw-bold">{product.quantity}</span>
      <button
        onClick={() => addToList(product)}
        className="mx-1 btn btn-width btn-secondary rounded-circle border border-2 border-dark"
      >
        +
      </button>
    </div>
  );
}

export default ListCard;
