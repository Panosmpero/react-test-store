import styled from "styled-components";

const CartPreviewContainer = styled.div`
  position: fixed;
  right: 0;
  width: 25vw;
  max-height: 400px;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  z-index: 4;
  ${(props) => (props.show ? null : "pointer-events: none;")}
`;

export default CartPreviewContainer;
