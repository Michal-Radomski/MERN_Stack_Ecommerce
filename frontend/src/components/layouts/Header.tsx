import React from "react";
import {Link, Route} from "react-router-dom";

import Search from "./Search";

const Header = (): JSX.Element => {
  return (
    <React.Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              {/* <img src={process.env.PUBLIC_URL + "images/shopit_logo.png"} alt="logo" /> */}
              <img src="images/shopit_logo.png" alt="logo" />
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({history}) => <Search history={history} />} />
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/login" className="btn ml-4" id="login_btn" style={{marginRight: "1.5rem"}}>
            Login
          </Link>
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
