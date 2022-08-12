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
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";

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
            <Route path="/cart" component={Cart} exact={true} />
            <Route path="/search/:keyword" component={Home} />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/password/forgot" component={ForgotPassword} />
            <Route path="/password/reset/:token" component={NewPassword} />
            <ProtectedRoute path="/me" component={Profile} exact={true} />
            <ProtectedRoute path="/me/update" component={UpdateProfile} exact={true} />
            <ProtectedRoute path="/password/update" component={UpdatePassword} exact={true} />
            <ProtectedRoute path="/shipping" component={Shipping} exact={true} />
            <ProtectedRoute path="/order/confirm" component={ConfirmOrder} exact={true} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
