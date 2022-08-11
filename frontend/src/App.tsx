import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./App.scss";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

import {loadUser} from "./redux/actions/userActions";
import store from "./redux/store";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";

const NotFound = (): JSX.Element => <h1 style={{textAlign: "center", marginTop: "80px"}}>Page Not Found</h1>;

function App(): JSX.Element {
  React.useEffect(() => {
    store.dispatch(loadUser() as Dispatch);
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Header />
        <div className="container container-fluid">
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/search/:keyword" component={Home} />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/me" component={Profile} exact={true} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
