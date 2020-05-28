import styled from "styled-components";

const CartPreviewContainer = styled.div`
  position: fixed;
  right: 0;
  top: 5rem;
  width: 30vw;
  max-height: 35vh;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  z-index: 4;
  ${(props) => (props.show ? null : "pointer-events: none;")}
`;

export default CartPreviewContainer;
