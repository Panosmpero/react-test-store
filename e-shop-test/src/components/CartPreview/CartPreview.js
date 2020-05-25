import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import CartPreviewContainer from "./CartPreviewContainer";
import CartPreviewWrapper from "./CartPreviewWrapper";
import CartPreviewProducts from "./CartPreviewProducts";
import CartPreviewFooter from "./CartPreviewFooter";

const CartPreview = () => {
  const { showCart } = useContext(ProductContext);

  return (
    <CartPreviewContainer show={showCart}>
      <CartPreviewWrapper show={showCart} className="cart-preview-wrapper">
        <CartPreviewProducts />
        <CartPreviewFooter />
      </CartPreviewWrapper>
    </CartPreviewContainer>
  );
};

export default CartPreview;
