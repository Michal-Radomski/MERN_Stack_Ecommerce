import React from "react";
import {Helmet} from "react-helmet";

const MetaData = ({title}: {title: string}): JSX.Element => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{`${title} - ShopIT`}</title>
      </Helmet>
    </React.Fragment>
  );
};

export default MetaData;
