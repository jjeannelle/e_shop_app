import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ShoppingCart() {
  const storeState = useSelector((state) => state);
  console.log("shoppingCart", storeState);

  const dispatch = useDispatch();

  const handleChange = (event, id) => {
    const indexItem = storeState.cart.findIndex((obj) => obj.id === id);
    const objUpdated = {
      ...storeState.cart[indexItem],
      quantity: Number(event.target.value),
    };
    dispatch({
      type: "UPDATEITEM",
      payload: objUpdated,
    });
  };

  let totalCartPrice = 0;
  if (storeState.cart.lengh !== 0) {
    for (const item of storeState.cart) {
      totalCartPrice += item.price * item.quantity;
    }
  }

  return (
    <div className="global-container">
      <p className="heading-cart">Votre panier : </p>
      <ul className="cart-list">
        {storeState.cart.map((item) => (
          <li key={item.id}>
            <img
              className="img-showcase"
              src={process.env.PUBLIC_URL + `/images/${item.img}.png`}
              alt=""
            />
            <div className="bloc-cart-infos">
              <h4>{item.title}</h4>
              <p>Prix : {item.price}</p>
            </div>
            <div className="bloc-input">
              <label htmlFor="quantityInput">Quantité</label>
              <input
                onChange={(e) => handleChange(e, item.id)}
                type="number"
                id="quantityInput"
                value={item.quantity}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="total-price">Total : {totalCartPrice.toFixed(2)}€</p>
      <button className="btn-cart">Procéder au paiement</button>
    </div>
  );
}
