import React from "react";

const Footer = (): JSX.Element => {
  return (
    <React.Fragment>
      <footer className="py-1">
        <p className="text-center mt-1">Shopping Cart - {new Date().getFullYear()}, All Rights Reserved</p>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
