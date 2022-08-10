import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import "./App.scss";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact={true} />
          <Route path="/product/:id" component={ProductDetails} exact={true} />
        </div>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
