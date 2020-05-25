import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import styled from "styled-components";

const Modal = () => {
  const { modal, modalProduct } = useContext(ProductContext);
  const { id, title, img, price } = modalProduct;

  return (
    <>
      <ModalContainer visible={modal}>
        <ModalWrapper visible={modal}>
          <h4 className="text-title">item added to the cart</h4>
          <div key={`Modal${id}`}>
            <h3>{title}</h3>
            <img src={img} alt="product" width="80%" />
            <p>Price: {price} €</p>
          </div>
        </ModalWrapper>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.342);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  opacity: 0;
  ${(props) => (props.visible ? "animation: vanish 2s linear;" : null)}
  pointer-events: none;
`;

const ModalWrapper = styled.div`
  background-color: var(--white);
  padding: 0.5rem;
  width: 20vw;
  min-width: 300px;
  border: 2px var(--blue) solid;
  border-radius: 5px;
  text-align: center;
  ${(props) => (props.visible ? "animation: move 2s linear;" : null)}
`;

export default Modal;
