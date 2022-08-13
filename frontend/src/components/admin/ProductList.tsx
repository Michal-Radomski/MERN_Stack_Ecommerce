import React from "react";
import {Link} from "react-router-dom";
import {MDBDataTable} from "mdbreact";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {History} from "history";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";

import {getAdminProducts, clearErrors} from "../../redux/actions/productActions";
// import { DELETE_PRODUCT_RESET } from '../../redux/constants/productConstants'

const ProductsList = ({history}: {history: History}): JSX.Element => {
  const alert = useAlert();
  const dispatch: Dispatch = useDispatch();

  const {loading, error, products} = useSelector((state: State) => state.products);
  // const {error: deleteError, isDeleted} = useSelector((state: State) => state.product);

  React.useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // if (deleteError) {
    //   alert.error(deleteError);
    //   dispatch(clearErrors());
    // }

    // if (isDeleted) {
    //   alert.success("Product deleted successfully");
    //   history.push("/admin/products");
    //   dispatch({ type: DELETE_PRODUCT_RESET })
    // }
  }, [dispatch, alert, error, history]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [] as any,
    };

    products.forEach((product: {_id: string; name: string; price: number; stock: number}) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <div style={{display: "inline-block", width: "4.5rem"}}>
            <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
              <i className="fa fa-pencil"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id: string) => {
    // dispatch(deleteProduct(id))
  };

  return (
    <React.Fragment>
      <MetaData title={"All Products"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <React.Fragment>
            <h1 className="my-5">All Products</h1>

            {loading ? <Loader /> : <MDBDataTable data={setProducts()} className="px-3" bordered striped hover />}
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductsList;
