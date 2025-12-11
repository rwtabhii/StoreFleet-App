import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { offerProducts } from "../../../data/offerProduct.js";
import styles from "../../../styles/component/crouselProduct.module.css";

function CrouselProductComponent() {
  return (
    <Carousel
      className={styles.carouselBox}
      autoPlay
      infiniteLoop
      interval={2500}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      swipeable={true}
    >
      {offerProducts.map((product) => (
        <div key={product.id} className={styles.carouselItem}>
          <img src={product.image} alt={product.name} />
          <p className="legend">
            {product.name} — ₹{product.price}
          </p>
        </div>
      ))}
    </Carousel>
  );
}

export const CrouselProduct = React.memo(CrouselProductComponent);
