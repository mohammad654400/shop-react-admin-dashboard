import axios from "axios";
import { useEffect, useState } from "react";

const AddProduct = () => {
  const [postApiProduct, setPostApiProduct] = useState({
    name: "",
    price: "",
    type: "",
    quantity: "",
    description: "",
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "price" || name === "quantity" ? parseInt(value) : value;
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
    <div >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        name :
        <input
          type="text"
          value={postApiProduct.name}
          onChange={handleChange}
          name="name"
        ></input>
        price:
        <input
          type="text"
          value={postApiProduct.price}
          onChange={handleChange}
          name="price"
        ></input>
        type:
        <select name="type" onChange={handleChange}>
          <option value="">Select type</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="child">Child</option>
        </select>
        quantity :
        <input
          type="text"
          value={postApiProduct.quantity}
          onChange={handleChange}
          name="quantity"
        ></input>
         description :
        <input
          type="text"
          value={postApiProduct.description}
          onChange={handleChange}
          name="description"
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default AddProduct;
