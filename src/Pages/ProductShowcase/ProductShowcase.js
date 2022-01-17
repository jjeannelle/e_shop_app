import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import inventory from "../../data/inventory";
import { useDispatch } from "react-redux";

export default function ProductShowcase() {
  const [nbMugs, setnbMugs] = useState(1);

  const dispatch = useDispatch();

  const addingInfo = useRef();
  let timerInfo;
  let display = true;

  const { id } = useParams();
  const productClicked = inventory.findIndex(
    (obj) => obj.title.replace(/\s+/g, "").trim() === id
  );

  const updateMugs = (e) => {
    setnbMugs(Number(e.target.value));
  };

  const addTocart = (e) => {
    e.preventDefault();

    const itemAdded = {
      ...inventory[productClicked],
      quantity: nbMugs,
    };

    dispatch({
      type: "ADDITEM",
      payload: itemAdded,
    });

    addingInfo.current.innerText = "Ajouté au panier";

    if (display) {
      display = false;
      timerInfo = setTimeout(() => {
        addingInfo.current.innerText = "";
        display = true;
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerInfo);
    };
  });

  return (
    <div className="showcase">
      <div className="container-img-showcase">
        <img
          className="img-showcase"
          src={
            process.env.PUBLIC_URL +
            `/images/${inventory[productClicked].img}.png`
          }
          alt=""
        />
      </div>
      <div className="product-infos">
        <h2>{inventory[productClicked].title}</h2>
        <p>Prix : {inventory[productClicked].price} €</p>
        <form onSubmit={addTocart}>
          <label htmlFor="quantity">Quantité</label>
          <input
            type="number"
            id="quantity"
            value={nbMugs}
            onChange={updateMugs}
          />
          <button>Ajouter au panier</button>
          <span ref={addingInfo} className="adding-info"></span>
        </form>
      </div>
    </div>
  );
}
