import React from "react";
import {countries} from "countries-list";
import {History} from "history";

import MetaData from "../layouts/MetaData";

import {useDispatch, useSelector} from "react-redux";
import {saveShippingInfo} from "../../redux/actions/cartActions";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = ({history}: {history: History}): JSX.Element => {
  const countriesList = Object.values(countries);
  // console.log({countriesList});

  const {shippingInfo} = useSelector((state: State) => state.cart);
  // console.log({shippingInfo});

  const [address, setAddress] = React.useState<string>(shippingInfo.address);
  const [city, setCity] = React.useState<string>(shippingInfo.city);
  const [postalCode, setPostalCode] = React.useState<string>(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = React.useState<string>(shippingInfo.phoneNo);
  const [country, setCountry] = React.useState<string>(
    shippingInfo.country ? shippingInfo.country : countriesList[178].name
  );
  // console.log({country});

  const dispatch: Dispatch = useDispatch();

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    dispatch(saveShippingInfo({address, city, phoneNo, postalCode, country}));
    history.push("/order/confirm");
  };

  return (
    <React.Fragment>
      <MetaData title={"Shipping Info"} />

      <CheckoutSteps shipping={true} confirmOrder={false} payment={false} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(event) => setPhoneNo(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                required
              >
                {countriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <button id="shipping_btn" type="submit" className="btn btn-block py-3">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Shipping;
