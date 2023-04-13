import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import * as storage from "../../utils/handlers/storage";

function ListCard({ product, addToList, removeFromList }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const storedState = storage.load(product.name);
    if (storedState) {
      setIsChecked(JSON.parse(storedState));
    }
  }, [product]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    localStorage.setItem(product.name, event.target.checked);
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
      <span className={isChecked ? "text-decoration-line-through" : "none"}>{product.name}</span>

      {product.image ? <img className="ms-auto img-fluid" alt={product.name} src={product.image} /> : ""}

      <button
        onClick={() => removeFromList(product)}
        className={product.image ? "mx-1 btn btn-width btn-secondary rounded-circle" : "ms-auto mx-1 btn btn-width btn-secondary rounded-circle"}
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
