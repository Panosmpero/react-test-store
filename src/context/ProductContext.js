import React, { createContext, useState, useEffect } from "react";
import { storeProducts } from "../data";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {

  const initialProducts = { storeProducts }  
  
  const [products, setProducts] = useState(initialProducts);

  // prevent detail crushing on refresh by using local storage
  const initialDetailState = JSON.parse(localStorage.getItem("detail")) || [];
  const [detail, setDetail] = useState(initialDetailState);

  // save cart state on local storage
  const initialCartState = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCartState);
  
  const [modal, setModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(detail);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem("detail", JSON.stringify(detail));
  }, [detail]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // refresh products' inCart status
  // synchronize buy button with state loaded from local storage
  const initalProductsState = () => {
    const initailCartState = JSON.parse(localStorage.getItem("cart")) || [];
    const cartIDs = initailCartState.map(x => x.id);
    cartIDs.forEach(x => {
      let cartProducts = initialProducts.storeProducts.find((el) => el.id === x)
      cartProducts.inCart = true
    });     
  };
  
  useEffect(() => {
    initalProductsState()
    setProducts({ ...products })
  }, [])


  // universal function for finding a product
  const getItem = (id) => {
    const product = products.storeProducts.find((el) => el.id === id);
    return product;
  };

  // show product details
  const handleDetail = (id) => {
    const product = getItem(id);
    setDetail(product);
  };

  // add cart
  const addToCart = (id) => {
    const product = getItem(id);
    product.inCart = true;
    product.count++;
    product.total = product.price * product.count;
    setCart([...cart, product]);
  };

  // clear cart
  const clearCart = () => {
    products.storeProducts.forEach((el) => {
      el.inCart = false 
      el.count = 0 
      el.total = 0
    });
    setCart([]);
  };

  // show hide modal when adding product
  const openModal = (id) => {
    const product = getItem(id);
    setModalProduct(product);
    setModal(true);
    setTimeout(() => {
      setModal(false);
    }, 2000);
  };

  const closeModal = () => {
    setModal(false);
  };

  // show hide cart preview
  const showHideCart = () => {
    setShowCart(!showCart);
  };

  const removeItem = (id) => {
    // filter out the selected id and remove it
    const cartProducts = cart.filter((el) => el.id !== id);
    setCart(cartProducts);
    // update the inCart status so that user can add again if he wishes
    const product = getItem(id);
    product.inCart = false;
  };

  const handleClick = (id, e) => {
    const product = cart.find((el) => el.id === id);
    product.count = e === "-" ? product.count - 1 : product.count + 1;
    product.count = product.count > 0 ? product.count : 1; 
    setCart([...cart]);
  };

  const sum = () => {
    return cart.length > 0
      ? cart
          .map((product) => product.price * product.count)
          .reduce((a, b) => a + b)
      : 0;
  };

  const handleChange = (id, e) => {
    const product = cart.find((el) => el.id === id);
    product.count = e > 0 ? Number(e) : Number(1)
    setCart([...cart])
  }
  

  return (
    <ProductContext.Provider
      value={{
        products,
        detail,
        cart,
        clearCart,
        handleDetail,
        addToCart,
        modal,
        modalProduct,
        openModal,
        closeModal,
        showHideCart,
        showCart,
        removeItem,
        handleClick,
        sum,
        handleChange
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
