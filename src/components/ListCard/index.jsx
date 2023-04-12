import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function ListCard({ product, addToList, removeFromList }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Card className="col p-1 d-flex flex-row align-items-center">
      <Form.Check
        className="mx-1"
        type="checkbox"
        id={product.name}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span style={{ textDecoration: isChecked ? "line-through" : "none" }}>{product.name}</span>

      {product.image ? <img id="list-img" className="ms-auto" alt={product.name} src={product.image} /> : ""}

      <button
        onClick={() => removeFromList(product)}
        className={product.image ? "mx-1 btn btn-secondary" : "ms-auto mx-1 btn btn-secondary"}
      >
        -
      </button>
      {product.quantity}
      <button onClick={() => addToList(product)} className="mx-1 btn btn-secondary">
        +
      </button>
    </Card>
  );
}

export default ListCard;
