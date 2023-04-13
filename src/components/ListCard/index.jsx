import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import * as storage from "../../utils/handlers/storage";

function ListCard({ product, listItems, addToList, removeFromList, setListItems }) {
  const [isChecked, setIsChecked] = useState(product.checked);

  useEffect(() => {
    const checkedState = product.checked;
    if (checkedState) {
      setIsChecked(product.checked);
    }
  }, [product]);

  const handleCheckboxChange = (event) => {
    const newListItems = [...listItems];
    const listItemIndex = newListItems.findIndex((item) => item.name === product.name);
    newListItems[listItemIndex].checked = event.target.checked;
    setListItems(newListItems);
    storage.save("listItems", newListItems);
    setIsChecked(event.target.checked);
  };

  return (
    <Card className="col p-1 d-flex flex-row align-items-center">
      <Form.Check
        className="mx-2"
        type="checkbox"
        id={product.name}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className={isChecked ? "text-decoration-line-through" : "none"}>{product.name} - {product.current_price} kr stk</span>

      {product.image ? <img className="ms-auto img-fluid" alt={product.name} src={product.image} /> : ""}

      <button
        onClick={() => removeFromList(product)}
        className={
          product.image
            ? "mx-1 btn btn-width btn-secondary rounded-circle"
            : "ms-auto mx-1 btn btn-width btn-secondary rounded-circle"
        }
      >
        -
      </button>
      {product.quantity}
      <button onClick={() => addToList(product)} className="mx-1 btn btn-width btn-secondary rounded-circle">
        +
      </button>
    </Card>
  );
}

export default ListCard;
