import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ListItems = () => {
  const { type } = useParams();

  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/product");
    const filteredItems = response.data.data.filter(
      (item) => item.type === type
    );

    setItems(filteredItems);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {items.map((item) => (
        <div className="bodyCardItem" style={{ margin: "20px" }} key={item.id}>
          <div className="card-img">
            <img className="img" src={item.imageFileName} alt="" />
          </div>

          <div className="card-title-row">
            <span className="card-title">{item.name}</span>
            <div className="card-star"></div>
          </div>

          <h3>Al Karam</h3>
          <h4>(4.1k) Customer Reviews</h4>

          <div className="bodyCardTitle">
            <div className="price">
              <h2 id="price">{item.price}</h2>
              <div className="row-remove">
                <div
                  onClick={() => handleDelete(item.id)}
                  className="remove"
                ></div>
                <h5 id="Condition">Almost Sold Out</h5>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListItems;
