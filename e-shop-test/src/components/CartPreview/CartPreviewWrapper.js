import styled from "styled-components";

const CartPreviewWrapper = styled.div`
  background: var(--white);
  width: 100%;
  max-height: 400px;
  border: 3px var(--blue) solid;
  border-radius: 10px;
  transform: translate(0, ${(props) => (props.show ? "0" : "-100%")});
  transition: 0.5s linear;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 5;

  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4);
    background: var(--lightblue);
    border-radius: 10px;
    padding: 3px;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background: var(--blue);
    border-radius: 10px;
  }
  
  &:hover::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px var(--white);
  }
`;

export default CartPreviewWrapper;
