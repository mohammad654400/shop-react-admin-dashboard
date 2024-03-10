import React, { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = () => {
  // State برای ذخیره اطلاعات محصول و نام تصویر
  const [postApiProduct, setPostApiProduct] = useState({
    name: "",
    price: "",
    type: "",
    quantity: "",
    description: "",
    imageFileName: "", 
  });


  const handleUpload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPostApiProduct({
        ...postApiProduct,
        imageFileName: `http://localhost:5000/images/` + response.data.filename,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "price" || name === "quantity" ? parseInt(value) : value;

    setPostApiProduct({ ...postApiProduct, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/product",
        postApiProduct
      );
      console.log("Post created:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          Name:
          <input
            type="text"
            value={postApiProduct.name}
            onChange={handleChange}
            name="name"
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            value={postApiProduct.price}
            onChange={handleChange}
            name="price"
          />
        </label>
        <label>
          Type:
          <select name="type" onChange={handleChange}>
            <option value="">Select type</option>
            <option value="woman">Woman</option>
            <option value="man">Man</option>
            <option value="child">Child</option>
          </select>
        </label>
        <label>
          Quantity:
          <input
            type="text"
            value={postApiProduct.quantity}
            onChange={handleChange}
            name="quantity"
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={postApiProduct.description}
            onChange={handleChange}
            name="description"
          />
        </label>

        <label>
          Image:
          <input type="file" onChange={handleUpload} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
