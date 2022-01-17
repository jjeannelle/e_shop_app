import React from "react";
import imgHomeShop from "./shopimg.jpg";

export default function Home() {
  return (
    <div className="global-container">
      <h1 className="home-title">
        Bienvenue au <span>Shop</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        quisquam atque pariatur repellendus quos excepturi reiciendis labore
        possimus deserunt! Quisquam debitis molestias ducimus quae architecto
        error ipsa amet nam aut.
      </p>
      <img src={imgHomeShop} alt="" />
    </div>
  );
}
