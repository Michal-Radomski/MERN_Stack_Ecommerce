import React from "react";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {History} from "history";

import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import {updateProduct, getProductDetails, clearErrors} from "../../redux/actions/productActions";
import {UPDATE_PRODUCT_RESET} from "../../redux/constants/productConstants";

const UpdateProduct = ({match, history}: {match: {params: {id: string}}; history: History}): JSX.Element => {
  const [name, setName] = React.useState<string>("");
  const [price, setPrice] = React.useState<any>(0);
  const [description, setDescription] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [stock, setStock] = React.useState<any>(0);
  const [seller, setSeller] = React.useState<string>("");
  const [images, setImages] = React.useState<any[]>([]);

  const [oldImages, setOldImages] = React.useState<any[]>([]);
  const [imagesPreview, setImagesPreview] = React.useState<any[]>([]);
  // console.log({oldImages});
  // console.log({imagesPreview});
  // console.log({stock});
  // console.log({price});

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const alert = useAlert();
  const dispatch: Dispatch = useDispatch();

  const {error, product} = useSelector((state: State) => state.productDetails);
  const {loading, error: updateError, isUpdated} = useSelector((state: State) => state.product);

  const productId = match.params.id;

  React.useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setSeller(product.seller);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      history.push("/admin/products");
      alert.success("Product updated successfully");
      dispatch({type: UPDATE_PRODUCT_RESET});
    }
  }, [dispatch, alert, error, isUpdated, history, updateError, product, productId]);

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image: string | Blob) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(product._id, formData));
  };

  const onChange = (event: any) => {
    const files = Array.from(event.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file as any);
    });
  };

  return (
    <React.Fragment>
      <MetaData title={"Update Product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <React.Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                <h1 className="mb-4">Update Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows={8}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(event) => setStock(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(event) => setSeller(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {oldImages &&
                    oldImages.map((img) => (
                      <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                    ))}

                  {imagesPreview.map((img) => (
                    <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                  ))}
                </div>

                <button id="login_button" type="submit" className="btn btn-block py-3" disabled={loading ? true : false}>
                  UPDATE
                </button>
              </form>
            </div>
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdateProduct;
