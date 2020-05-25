import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart/Cart";
import Default from "./components/Default";
import Modal from "./components/Modal";
import CartPreview from "./components/CartPreview/CartPreview";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <CartPreview />
      <Modal />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
