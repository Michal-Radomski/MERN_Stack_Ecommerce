import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";

// Payment
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

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
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import ProductList from "./components/admin/ProductList";
import ProcessOrder from "./components/admin/ProcessOrder";
import OrderList from "./components/admin/OrderList";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";

const NotFound = (): JSX.Element => <h1 style={{textAlign: "center", marginTop: "80px"}}>Page Not Found</h1>;

function App(): JSX.Element {
  const [stripeApiKey, setStripeApiKey] = React.useState<string>("");
  // console.log({stripeApiKey});

  // const {user, loading} = useSelector((state: State) => state.auth);
  const {user} = useSelector((state: State) => state.auth);
  // console.log({user});

  const user_ID = user?._id ?? null;
  // console.log({user_ID});

  async function getStripApiKey() {
    const {data} = await axios.get("/api/v1/stripeapi");
    // console.log({data});
    await setStripeApiKey(data.stripeApiKey);
  }

  if (user_ID) {
    getStripApiKey();
  }

  React.useEffect(() => {
    store.dispatch(loadUser() as Dispatch);
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Header />
        <div className="container container-fluid" style={{maxWidth: "unset"}}>
          <Switch>
            <ProtectedRoute path="/dashboard" component={Dashboard} exact={true} isAdmin={true} />
            <ProtectedRoute path="/admin/products" component={ProductList} exact={true} isAdmin={true} />
            <ProtectedRoute path="/admin/product" component={NewProduct} exact={true} isAdmin={true} />
            <ProtectedRoute path="/admin/product/:id" component={UpdateProduct} isAdmin={true} />
            <ProtectedRoute path="/admin/orders" component={OrderList} isAdmin={true} exact={true} />
            <ProtectedRoute path="/admin/order/:id" component={ProcessOrder} isAdmin={true} />
            <ProtectedRoute path="/admin/users" component={UsersList} isAdmin={true} exact={true} />
            <ProtectedRoute path="/admin/user/:id" component={UpdateUser} isAdmin={true} />
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
            <ProtectedRoute path="/success" component={OrderSuccess} exact={true} />
            <ProtectedRoute path="/orders/me" component={ListOrders} exact={true} />
            <ProtectedRoute path="/order/:id" component={OrderDetails} exact={true} />
            {stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute path="/payment" component={Payment} exact={true} />
              </Elements>
            )}
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
        {/* //* If admin -> no <Footer /> component */}
        {/* {!loading && user.role !== "admin" && <Footer />} */}
      </Router>
    </React.Fragment>
  );
}

export default App;
