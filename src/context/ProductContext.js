import React, { createContext, useState, useEffect } from "react";
import { storeProducts } from "../data";

export const ProductContext = createContext();

// get min, max product price
const minRange = storeProducts.reduce((a,b) => {return a>=b.price ? b.price : a}, 0);
const maxRange = storeProducts.reduce((a,b) => {return a<=b.price ? b.price : a}, 0);

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
    "valueA": minRange, 
    "valueB": maxRange,
    "rangeLeft" : 0,
    "rangeRight": 0
  };
  const [slider, setSlider] = useState(sliderInitialState);

  // get all brand tags
  const uniqueManufacturers = [...new Set(initialProducts.storeProducts.map(x => x.company))];
  const [manufacturers, setManufacturers] = useState(uniqueManufacturers);
  const [sortedManufacturers, setSortedManufacturers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  
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

  // ====== FILTER ====== 
  const multiFilter = () => {

    let storeProducts = initialProducts.storeProducts;   
    
    // Filter with tags if there are tags
    if (sortedManufacturers.length > 0) {
      storeProducts = storeProducts.filter(product => {
        return sortedManufacturers.includes(product.company);
      });
    };

    // Filter with search keywords
    if (searchFocus || search.length > 0) {
      let regX = new RegExp(search, "gi")
      storeProducts = storeProducts.filter(product => {
        return regX.test(product.title) || regX.test(product.company) || regX.test(product.info)
      });
    };
    
    // Filter with slider price range    
    storeProducts = storeProducts.filter(product => {
      return product.price >= slider.valueA && product.price <= slider.valueB
    }); 

    // UPDATE state
    setProducts({storeProducts});
  };

  // Open / close filter
  const openCloseFilter = () => {
    setShowFilter(!showFilter);
  };  

  // ======== SLIDERS ======== 
  const updateSlider = (e) => {
    // Sliders overlap prevention
    if (e.id === "slider-A") slider.valueA = Math.min(e.value, slider.valueB - 1);
    if (e.id === "slider-B") slider.valueB = Math.max(e.value, slider.valueA + 1);

    // update thumbs, range, tooltip  
    let percentA = ((slider.valueA - minRange) / (maxRange - minRange)) * 100;
    let percentB = ((slider.valueB - minRange) / (maxRange - minRange)) * 100;    

    slider.rangeLeft = percentA;
    slider.rangeRight = 100 - percentB;
    setSlider({...slider});    
    multiFilter();
  };

  // ======== TAGS ======== 
  const updateManufacturers = (e, addTag=true) => {
    // Manufacturer add tag 
    if (addTag) {
      const manuf = manufacturers.filter(manuf => manuf !== e.id);
      setSortedManufacturers([...sortedManufacturers, e.id]);
      setManufacturers(manuf);    
    };

    // Manufacturer remove tag 
    if (!addTag)  {
      const manuf = sortedManufacturers.filter(manuf => manuf !== e.id);
      setSortedManufacturers(manuf);
      setManufacturers([...manufacturers, e.id]);
    };
    multiFilter();
  };

  // Sort ascending / descending by price
  const priceSort = (value) => {
    const storeProducts = value === "ascending" 
      ? products.storeProducts.sort((a,b) => a.price - b.price)
      : products.storeProducts.sort((a,b) => b.price - a.price);
    setProducts({storeProducts});    
  };

  const updateInput = (value) => {
    setSearch(value);
    multiFilter();
  };
  
  const changeFocus = () => {
    setSearchFocus(!searchFocus);
  };
  

  // RESET filter
  const resetFilter = () => {
    setSlider(sliderInitialState);
    setProducts(initialProducts);
    setManufacturers(uniqueManufacturers);
    setSortedManufacturers([]);
    setSearch("");
    setSearchFocus(false);
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
        slider,
        setSlider,
        minRange,
        maxRange,
        updateSlider,
        openCloseFilter,
        showFilter,        
        priceSort,
        manufacturers,
        sortedManufacturers,
        updateManufacturers,
        search,
        updateInput,
        changeFocus,
        resetFilter        
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
