import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import "./App.scss";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

const NotFound = (): JSX.Element => <h1 style={{textAlign: "center", marginTop: "80px"}}>Page Not Found</h1>;

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact={true} />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="*" component={NotFound} />
        </div>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
