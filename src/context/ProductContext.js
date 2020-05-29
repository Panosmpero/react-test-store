import React, { createContext, useState, useEffect } from "react";
import { storeProducts } from "../data";

export const ProductContext = createContext();

// get min, max product price
const minRange = storeProducts.reduce((a, b) => {
  return a >= b.price ? b.price : a;
}, 0);
const maxRange = storeProducts.reduce((a, b) => {
  return a <= b.price ? b.price : a;
}, 0);

const ProductContextProvider = ({ children }) => {
  const initialProducts = { storeProducts };
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
  const [showFilter, setShowFilter] = useState(false);

  const sliderInitialState = {
    valueA: minRange,
    valueB: maxRange,
    rangeLeft: 0,
    rangeRight: 0,
  };

  // get all company tags
  const uniqueManufacturers = [
    ...new Set(initialProducts.storeProducts.map((x) => x.company)),
  ];
  const [filter, setFilter] = useState({
    slider: sliderInitialState,
    manufacturers: uniqueManufacturers,
    sortedManufacturers: [],
    search: "",
    sort: null
  });

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
    const cartIDs = initailCartState.map((x) => x.id);
    cartIDs.forEach((x) => {
      let cartProducts = initialProducts.storeProducts.find(
        (el) => el.id === x
      );
      cartProducts.inCart = true;
    });
  };

  useEffect(() => {
    initalProductsState();
    setProducts({ ...products });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      el.inCart = false;
      el.count = 0;
      el.total = 0;
    });
    setCart([]);
  };

  // show hide modal when adding product
  const openModal = (id) => {
    const product = getItem(id);
    setModalProduct(product);
    setModal(true);
    setTimeout(() => {
      closeModal();
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

  // increase / decrease product quantity on /cart
  const handleClick = (id, e) => {
    const product = cart.find((el) => el.id === id);
    product.count = e === "-" ? product.count - 1 : product.count + 1;
    // failsafe for negative/zero quantity
    product.count = product.count > 0 ? product.count : 1;
    setCart([...cart]);
  };

  // final price with tax included
  const sum = () => {
    return cart.length > 0
      ? cart
          .map((product) => product.price * product.count)
          .reduce((a, b) => a + b)
      : 0;
  };

  // set custom product quantity with input
  const handleChange = (id, e) => {
    const product = cart.find((el) => el.id === id);
    product.count = e > 0 ? Number(e) : Number(1);
    setCart([...cart]);
  };

  // ========= FILTER =========
  // Update render with each filter state change
  useEffect(() => {
    multiFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const multiFilter = () => {
    let storeProducts = initialProducts.storeProducts;

    // Filter with tags if there are tags
    if (filter.sortedManufacturers.length > 0) {
      storeProducts = storeProducts.filter((product) => {
        return filter.sortedManufacturers.includes(product.company);
      });
    };

    // Filter with search keywords
    if (filter.search.length > 0) {
      let regWord = filter.search
        .split("")
        .map((letter) => `(?=.*${letter})`)
        .join("");

      let regX = new RegExp(regWord, "gi");
      storeProducts = storeProducts.filter((product) => {
        return (
          product.title.toLowerCase().includes(filter.search) ||
          product.title.match(regX)
        );
      });
    };

    // Filter with slider price range
    storeProducts = storeProducts.filter((product) => {
      return (
        product.price >= filter.slider.valueA &&
        product.price <= filter.slider.valueB
      );
    });

    // Filter with sort
    if (filter.sort) {
      storeProducts =
        filter.sort === "ascending"
          ? storeProducts.sort((a, b) => a.price - b.price)
          : storeProducts.sort((a, b) => b.price - a.price);
    };
    console.log(filter.sort)
    // UPDATE state
    setProducts({ storeProducts });
  };

  // Open / close filter
  const openCloseFilter = () => {
    setShowFilter(!showFilter);
  };

  // ======== SLIDERS ========
  const updateSlider = (e) => {
    // Sliders overlap prevention
    if (e.id === "slider-A")
      filter.slider.valueA = Math.min(e.value, filter.slider.valueB - 1);
    if (e.id === "slider-B")
      filter.slider.valueB = Math.max(e.value, filter.slider.valueA + 1);

    // update thumbs, range, tooltip
    let percentA =
      ((filter.slider.valueA - minRange) / (maxRange - minRange)) * 100;
    let percentB =
      ((filter.slider.valueB - minRange) / (maxRange - minRange)) * 100;

    filter.slider.rangeLeft = percentA;
    filter.slider.rangeRight = 100 - percentB;
    setFilter({ ...filter });
  };

  // ======== TAGS ========
  const updateManufacturers = (e, addTag = true) => {
    // Manufacturer add tag
    if (addTag) {
      const manuf = filter.manufacturers.filter((manuf) => manuf !== e.id);
      filter.sortedManufacturers.push(e.id);
      setFilter({
        ...filter,
        manufacturers: manuf,
      });
    }

    // Manufacturer remove tag
    if (!addTag) {
      const manuf = filter.sortedManufacturers.filter(
        (manuf) => manuf !== e.id
      );
      filter.manufacturers.push(e.id);
      setFilter({
        ...filter,
        sortedManufacturers: manuf,
      });
    }
  };

  // Sort ascending / descending by price
  const priceSort = (value) => {    
    setFilter({
      ...filter,
      sort: value
    })
  };

  const updateInput = (value) => {
    setFilter({
      ...filter,
      search: value,
    });
  };

  // RESET filter
  const resetFilter = () => {
    setFilter({
      slider: sliderInitialState,
      manufacturers: uniqueManufacturers,
      sortedManufacturers: [],
      search: "",
      sort: null
    });
    setProducts(initialProducts);
  };

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
        handleChange,
        filter,
        setFilter,
        minRange,
        maxRange,
        updateSlider,
        openCloseFilter,
        showFilter,
        priceSort,
        updateManufacturers,
        updateInput,
        resetFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
